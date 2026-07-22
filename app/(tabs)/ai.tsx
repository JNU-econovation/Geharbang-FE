import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AiConversationSummary,
  deleteAiConversation,
  getAiConversation,
  getAiConversations,
  postAiChat,
  postAiChatWithImage,
} from "@/src/services/ai/chat";
import { useAuthStore } from "@/src/stores/auth/useAuthStore";
import { buildAssetUrl } from "@/src/config/url";
import { File } from "@/src/types/File";
import ChatbotCharacter from "@/public/svgs/Ai/chatbotCharacter.svg";
import WeatherIcon from "@/public/svgs/Ai/weather.svg";
import GuesthouseIcon from "@/public/svgs/Ai/guesthouse.svg";
import DinnerIcon from "@/public/svgs/Ai/dinner.svg";

const BLUE = "#0EA5E9";

const suggestions = [
  {
    Icon: WeatherIcon,
    width: 24,
    height: 18,
    text: "오늘 제주도 날씨를 알려주세요.",
  },
  {
    Icon: GuesthouseIcon,
    width: 17,
    height: 18,
    text: "애월읍 분위기 좋은 게하를 추천해주세요.",
  },
  {
    Icon: DinnerIcon,
    width: 18,
    height: 18,
    text: "오늘 저녁 메뉴를 추천해주세요.",
  },
];

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  createdAt: string;
  imageUri?: string;
}

type ChatListItem =
  | { id: string; type: "date"; date: Date }
  | { id: string; type: "message"; message: ChatMessage };

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

const formatKoreanDate = (date: Date) =>
  `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${
    WEEKDAYS[date.getDay()]
  }요일`;

const formatHistoryDate = (value: string) => {
  const date = new Date(value);
  const today = new Date();
  if (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  ) {
    return "오늘";
  }
  if (date.getFullYear() !== today.getFullYear()) {
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  }
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
};

const getLocalDateKey = (date: Date) =>
  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

export default function AiTabScreen() {
  const canGoBack = router.canGoBack();
  const isLoggedIn = useAuthStore((state) => Boolean(state.accessToken));
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState<string | null>(null);
  const [conversations, setConversations] = useState<AiConversationSummary[]>([]);
  const sessionIdRef = useRef<string | undefined>(undefined);
  const scrollRef = useRef<FlatList<ChatListItem>>(null);
  const chatListItems = useMemo<ChatListItem[]>(() => {
    let previousDateKey: string | undefined;

    return messages.flatMap((chatMessage, index) => {
      const createdAt = new Date(chatMessage.createdAt);
      const date = Number.isNaN(createdAt.getTime()) ? new Date() : createdAt;
      const dateKey = getLocalDateKey(date);
      const messageItem: ChatListItem = {
        id: `message-${chatMessage.id}`,
        type: "message",
        message: chatMessage,
      };

      if (dateKey === previousDateKey) return [messageItem];

      previousDateKey = dateKey;
      return [
        { id: `date-${dateKey}-${index}`, type: "date", date },
        messageItem,
      ];
    });
  }, [messages]);

  const startNewConversation = () => {
    sessionIdRef.current = undefined;
    setMessage("");
    setSelectedImage(null);
    setMessages([]);
    setIsHistoryVisible(false);
  };

  const openHistory = async () => {
    setIsHistoryVisible(true);
    setHistoryError(null);
    if (!isLoggedIn) return;

    setIsHistoryLoading(true);
    try {
      setConversations(await getAiConversations());
    } catch {
      setHistoryError("대화 기록을 불러오지 못했어요.");
    } finally {
      setIsHistoryLoading(false);
    }
  };

  const openConversation = async (sessionId: string) => {
    setIsHistoryLoading(true);
    setHistoryError(null);
    try {
      const conversation = await getAiConversation(sessionId);
      sessionIdRef.current = conversation.sessionId;
      setSelectedImage(null);
      setMessages(
        conversation.messages.map((item) => ({
          id: `saved-${item.id}`,
          role: item.role,
          text: item.content,
          createdAt: item.createdAt,
          imageUri: buildAssetUrl(item.imageUrl) ?? undefined,
        })),
      );
      setIsHistoryVisible(false);
    } catch {
      setHistoryError("선택한 대화를 불러오지 못했어요.");
    } finally {
      setIsHistoryLoading(false);
    }
  };

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("사진 접근 권한", "사진을 첨부하려면 사진 접근 권한이 필요합니다.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      quality: 0.8,
    });
    if (result.canceled) return;

    const asset = result.assets[0];
    if (asset.fileSize && asset.fileSize > 5 * 1024 * 1024) {
      Alert.alert("이미지 용량 초과", "5MB 이하의 이미지를 선택해 주세요.");
      return;
    }

    setSelectedImage({
      uri: asset.uri,
      type:
        asset.mimeType === "image/jpg" || asset.mimeType === "image/pjpeg"
          ? "image/jpeg"
          : asset.mimeType || "image/jpeg",
      name: asset.fileName || `ai-chat-${Date.now()}.jpg`,
    });
  };

  const confirmDeleteConversation = (conversation: AiConversationSummary) => {
    Alert.alert("대화 기록 삭제", `‘${conversation.title}’ 기록을 삭제할까요?`, [
      { text: "취소", style: "cancel" },
      {
        text: "삭제",
        style: "destructive",
        onPress: () => {
          void (async () => {
            try {
              await deleteAiConversation(conversation.sessionId);
              setConversations((current) =>
                current.filter((item) => item.sessionId !== conversation.sessionId),
              );
              if (sessionIdRef.current === conversation.sessionId) {
                startNewConversation();
              }
            } catch {
              setHistoryError("대화 기록을 삭제하지 못했어요.");
            }
          })();
        },
      },
    ]);
  };

  const sendMessage = async (text = message) => {
    const trimmed = text.trim();
    const imageToSend = selectedImage;
    if ((!trimmed && !imageToSend) || isSending) return;
    const outgoingText = trimmed || "이 사진에 대해 알려주세요.";
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text: outgoingText,
      createdAt: new Date().toISOString(),
      imageUri: imageToSend?.uri,
    };
    setMessages((current) => [...current, userMessage]);
    setMessage("");
    setSelectedImage(null);
    setIsSending(true);

    try {
      const response = imageToSend
        ? await postAiChatWithImage(
            outgoingText,
            imageToSend,
            sessionIdRef.current,
          )
        : await postAiChat(outgoingText, sessionIdRef.current);
      sessionIdRef.current = response.sessionId;
      setMessages((current) => [
        ...current,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          text: response.answer,
          createdAt: new Date().toISOString(),
        },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: `error-${Date.now()}`,
          role: "assistant",
          text: "답변을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.",
          createdAt: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const canSend = Boolean(message.trim() || selectedImage) && !isSending;

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        <View style={styles.header}>
          <Pressable
            accessibilityLabel='뒤로 가기'
            hitSlop={12}
            onPress={() => (canGoBack ? router.back() : router.replace("/"))}
            style={styles.backButton}
          >
            <Ionicons name='chevron-back' size={27} color='#334155' />
          </Pressable>
          <Text style={styles.headerTitle}>게하르방 챗봇</Text>
          <View style={styles.headerActions}>
            <Pressable
              accessibilityLabel='대화 메뉴 열기'
              hitSlop={8}
              onPress={() => void openHistory()}
              style={styles.headerActionButton}
            >
              <Ionicons name='menu-outline' size={28} color='#334155' />
            </Pressable>
          </View>
        </View>

        {messages.length === 0 ? (
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps='handled'
            showsVerticalScrollIndicator={false}
          >
            <LinearGradient
              colors={["#E3F3FF", "#FFFFFF"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 0.55 }}
              style={styles.emptyState}
            >
              <ChatbotCharacter />
              <Text style={styles.welcomeTitle}>
                제주도 여행에 궁금한 점이 있나요?
              </Text>
              <Text style={styles.description}>
                맛집부터 날씨, 게스트하우스 추천까지{"\n"}
                게하르방 챗봇이 빠르게 답을 찾아 드릴게요
              </Text>

              <View style={styles.suggestionSection}>
                <View style={styles.dividerRow}>
                  <View style={styles.divider} />
                  <Text style={styles.dividerText}>이렇게 질문해보세요!</Text>
                  <View style={styles.divider} />
                </View>
                <View style={styles.suggestionList}>
                  {suggestions.map((suggestion) => (
                    <Pressable
                      key={suggestion.text}
                      disabled={isSending}
                      onPress={() => void sendMessage(suggestion.text)}
                      style={({ pressed }) => [
                        styles.suggestion,
                        pressed && styles.suggestionPressed,
                      ]}
                    >
                      <View style={styles.suggestionContent}>
                        <View style={styles.suggestionIcon}>
                          <suggestion.Icon
                            width={suggestion.width}
                            height={suggestion.height}
                          />
                        </View>
                        <Text numberOfLines={1} style={styles.suggestionText}>
                          {suggestion.text}
                        </Text>
                      </View>
                    </Pressable>
                  ))}
                </View>
              </View>
            </LinearGradient>
          </ScrollView>
        ) : (
          <FlatList
            ref={scrollRef}
            data={chatListItems}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              if (item.type === "date") {
                return (
                  <View style={styles.dateSeparator}>
                    <Text style={styles.dateSeparatorText}>
                      {formatKoreanDate(item.date)}
                    </Text>
                  </View>
                );
              }

              return item.message.role === "user" ? (
                <View style={styles.userBubble}>
                  {item.message.imageUri ? (
                    <Image
                      contentFit='cover'
                      source={{ uri: item.message.imageUri }}
                      style={styles.messageImage}
                      transition={150}
                    />
                  ) : null}
                  <Text style={styles.userBubbleText}>{item.message.text}</Text>
                </View>
              ) : (
                <View style={styles.botMessageGroup}>
                  <View style={styles.botAvatarRow}>
                    <ChatbotCharacter width={38} height={40} />
                    <Text style={styles.botName}>게하르방 챗봇</Text>
                  </View>
                  <View style={styles.botBubble}>
                    <Text style={styles.botBubbleText}>
                      {item.message.text}
                    </Text>
                  </View>
                </View>
              );
            }}
            ListFooterComponent={
              isSending ? (
                <View style={styles.botMessageGroup}>
                  <View style={styles.botAvatarRow}>
                    <ChatbotCharacter width={38} height={40} />
                    <Text style={styles.botName}>게하르방 챗봇</Text>
                  </View>
                  <View style={styles.loadingBubble}>
                    <ActivityIndicator size='small' color={BLUE} />
                    <Text style={styles.loadingText}>답변을 찾고 있어요</Text>
                  </View>
                </View>
              ) : null
            }
            style={styles.messageList}
            contentContainerStyle={styles.messages}
            keyboardShouldPersistTaps='handled'
            onContentSizeChange={() =>
              scrollRef.current?.scrollToEnd({ animated: true })
            }
            showsVerticalScrollIndicator={false}
          />
        )}

        <View style={styles.inputBar}>
          {selectedImage ? (
            <View style={styles.attachmentPreview}>
              <Image
                contentFit='cover'
                source={{ uri: selectedImage.uri }}
                style={styles.attachmentPreviewImage}
              />
              <Pressable
                accessibilityLabel='첨부 이미지 삭제'
                hitSlop={8}
                onPress={() => setSelectedImage(null)}
                style={styles.attachmentRemoveButton}
              >
                <Ionicons name='close' size={16} color='#FFFFFF' />
              </Pressable>
            </View>
          ) : null}
          <View style={styles.inputRow}>
            <Pressable
              accessibilityLabel='사진 첨부하기'
              disabled={isSending}
              onPress={() => void pickImage()}
              style={styles.addButton}
            >
              <Ionicons name='add' size={30} color='#111827' />
            </Pressable>
            <View style={styles.inputContainer}>
              <TextInput
                value={message}
                onChangeText={setMessage}
                editable={!isSending}
                maxLength={1000}
                multiline
                onSubmitEditing={() => void sendMessage()}
                placeholder='무엇이든 물어보세요'
                placeholderTextColor='#D1D5DB'
                returnKeyType='send'
                scrollEnabled
                style={styles.input}
                submitBehavior='submit'
              />
              <Pressable
                accessibilityLabel='메시지 보내기'
                disabled={!canSend}
                onPress={() => void sendMessage()}
                style={[
                  styles.sendButton,
                  !canSend && styles.sendButtonDisabled,
                ]}
              >
                <Ionicons name='arrow-up' size={21} color='#FFFFFF' />
              </Pressable>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>

      <Modal
        animationType='slide'
        onRequestClose={() => setIsHistoryVisible(false)}
        presentationStyle='pageSheet'
        visible={isHistoryVisible}
      >
        <SafeAreaView style={styles.historySafeArea} edges={["top", "bottom"]}>
          <View style={styles.historyHeader}>
            <Pressable
              accessibilityLabel='대화 기록 닫기'
              hitSlop={10}
              onPress={() => setIsHistoryVisible(false)}
              style={styles.historyHeaderButton}
            >
              <Ionicons name='close' size={26} color='#334155' />
            </Pressable>
            <Text style={styles.historyTitle}>지난 대화</Text>
            <Pressable
              accessibilityLabel='새 대화 시작'
              hitSlop={10}
              onPress={startNewConversation}
              style={styles.historyHeaderButton}
            >
              <Ionicons name='create-outline' size={24} color={BLUE} />
            </Pressable>
          </View>

          {!isLoggedIn ? (
            <View style={styles.historyEmptyState}>
              <Ionicons name='lock-closed-outline' size={34} color='#94A3B8' />
              <Text style={styles.historyEmptyTitle}>로그인이 필요해요</Text>
              <Text style={styles.historyEmptyDescription}>
                로그인하면 AI 대화를 안전하게 저장하고{"\n"}
                다른 기기에서도 다시 확인할 수 있어요.
              </Text>
            </View>
          ) : isHistoryLoading && conversations.length === 0 ? (
            <View style={styles.historyEmptyState}>
              <ActivityIndicator color={BLUE} />
              <Text style={styles.historyEmptyDescription}>
                대화 기록을 불러오고 있어요
              </Text>
            </View>
          ) : (
            <FlatList
              data={conversations}
              keyExtractor={(item) => item.sessionId}
              contentContainerStyle={styles.historyList}
              ListHeaderComponent={
                historyError ? (
                  <Text style={styles.historyError}>{historyError}</Text>
                ) : null
              }
              ListEmptyComponent={
                <View style={styles.historyEmptyState}>
                  <Ionicons
                    name='chatbubble-ellipses-outline'
                    size={36}
                    color='#94A3B8'
                  />
                  <Text style={styles.historyEmptyTitle}>아직 대화 기록이 없어요</Text>
                  <Text style={styles.historyEmptyDescription}>
                    새 질문을 보내면 첫 질문을 제목으로 저장해드려요.
                  </Text>
                </View>
              }
              renderItem={({ item }) => (
                <Pressable
                  disabled={isHistoryLoading}
                  onPress={() => void openConversation(item.sessionId)}
                  style={({ pressed }) => [
                    styles.historyItem,
                    pressed && styles.historyItemPressed,
                  ]}
                >
                  <View style={styles.historyItemContent}>
                    <View style={styles.historyItemTitleRow}>
                      <Text numberOfLines={1} style={styles.historyItemTitle}>
                        {item.title}
                      </Text>
                      <Text style={styles.historyItemDate}>
                        {formatHistoryDate(item.updatedAt)}
                      </Text>
                    </View>
                    <Text numberOfLines={2} style={styles.historyItemPreview}>
                      {item.lastMessage}
                    </Text>
                  </View>
                  <Pressable
                    accessibilityLabel='대화 기록 삭제'
                    hitSlop={8}
                    onPress={(event) => {
                      event.stopPropagation();
                      confirmDeleteConversation(item);
                    }}
                    style={styles.historyDeleteButton}
                  >
                    <Ionicons name='trash-outline' size={20} color='#94A3B8' />
                  </Pressable>
                </Pressable>
              )}
              showsVerticalScrollIndicator={false}
            />
          )}
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FFFFFF" },
  container: { flex: 1, backgroundColor: "#FBFDFF" },
  header: {
    height: 62,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#EEF2F6",
    paddingHorizontal: 16,
  },
  backButton: { width: 42, height: 42, justifyContent: "center" },
  headerTitle: {
    position: "absolute",
    left: 64,
    right: 64,
    color: "#111827",
    fontSize: 21,
    fontWeight: "400",
    textAlign: "center",
  },
  headerActions: {
    marginLeft: "auto",
    alignItems: "center",
  },
  headerActionButton: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContent: { flexGrow: 1 },
  emptyState: {
    flex: 1,
    alignItems: "center",
    paddingTop: 164,
    paddingHorizontal: 16,
  },
  welcomeTitle: {
    marginTop: 32,
    color: BLUE,
    fontSize: 19,
    fontWeight: "700",
    textAlign: "center",
  },
  description: {
    marginTop: 10,
    color: "#111827",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 24,
    textAlign: "center",
  },
  suggestionSection: { width: "100%", marginTop: 80 },
  dividerRow: { flexDirection: "row", alignItems: "center", gap: 16 },
  divider: { flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: "#CBD5E1" },
  dividerText: {
    color: "#9CA3AF",
    fontSize: 14,
    fontWeight: "400",
  },
  suggestionList: { alignItems: "center", gap: 9, marginTop: 18 },
  suggestion: {
    height: 39,
    maxWidth: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#D8DADD",
    borderRadius: 22,
    paddingHorizontal: 12,
    backgroundColor: "#FFFFFF",
  },
  suggestionPressed: { backgroundColor: "#F0F9FF", borderColor: "#BAE6FD" },
  suggestionContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  suggestionIcon: {
    width: 25,
    marginRight: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  suggestionText: {
    color: "#6B7280",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
  },
  messageList: { flex: 1 },
  messages: { padding: 20, gap: 14 },
  dateSeparator: {
    alignSelf: "center",
    marginBottom: 8,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 14,
    backgroundColor: "#F1F5F9",
  },
  dateSeparatorText: { color: "#94A3B8", fontSize: 12, fontWeight: "500" },
  userBubble: {
    alignSelf: "flex-end",
    maxWidth: "82%",
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#FFFFFF",
  },
  userBubbleText: {
    color: "#1F2937",
    fontSize: 15,
    fontWeight: "500",
    lineHeight: 23,
  },
  messageImage: {
    width: 210,
    height: 150,
    marginBottom: 9,
    borderRadius: 12,
    backgroundColor: "#E2E8F0",
  },
  botMessageGroup: { alignSelf: "flex-start", maxWidth: "82%" },
  botAvatarRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
  },
  botName: { color: "#64748B", fontSize: 12, fontWeight: "500" },
  botBubble: {
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#CDE9FC",
    backgroundColor: "#F3FAFF",
  },
  botBubbleText: {
    color: "#1F2937",
    fontSize: 15,
    fontWeight: "500",
    lineHeight: 23,
  },
  loadingBubble: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#CDE9FC",
    backgroundColor: "#F3FAFF",
  },
  loadingText: { color: "#64748B", fontSize: 13, fontWeight: "500" },
  inputBar: {
    minHeight: 72,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#EEF2F6",
    backgroundColor: "#FFFFFF",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
  },
  attachmentPreview: {
    alignSelf: "flex-start",
    width: 72,
    height: 72,
    marginBottom: 10,
  },
  attachmentPreviewImage: {
    width: 72,
    height: 72,
    borderRadius: 12,
    backgroundColor: "#E2E8F0",
  },
  attachmentRemoveButton: {
    position: "absolute",
    top: -7,
    right: -7,
    width: 23,
    height: 23,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: "#334155",
  },
  addButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOpacity: 0.08,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  inputContainer: {
    flex: 1,
    minHeight: 44,
    maxHeight: 104,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 23,
    backgroundColor: "#F5F7FA",
    paddingLeft: 17,
    paddingRight: 5,
  },
  input: {
    flex: 1,
    minHeight: 44,
    maxHeight: 96,
    color: "#111827",
    fontSize: 15,
    fontWeight: "400",
    lineHeight: 22,
    paddingVertical: 10,
    textAlignVertical: "center",
  },
  sendButton: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 17,
    backgroundColor: "#111111",
  },
  sendButtonDisabled: { opacity: 0.35 },
  historySafeArea: { flex: 1, backgroundColor: "#FFFFFF" },
  historyHeader: {
    height: 58,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E5E7EB",
  },
  historyHeaderButton: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
  },
  historyTitle: { color: "#111827", fontSize: 19, fontWeight: "700" },
  historyList: { flexGrow: 1, padding: 16, gap: 10 },
  historyError: {
    marginBottom: 4,
    padding: 12,
    borderRadius: 10,
    color: "#B91C1C",
    fontSize: 13,
    textAlign: "center",
    backgroundColor: "#FEF2F2",
  },
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 8,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
  },
  historyItemPressed: { backgroundColor: "#F8FAFC" },
  historyItemContent: { flex: 1 },
  historyItemTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  historyItemTitle: {
    flex: 1,
    color: "#1F2937",
    fontSize: 15,
    fontWeight: "700",
  },
  historyItemDate: { color: "#94A3B8", fontSize: 12 },
  historyItemPreview: {
    marginTop: 7,
    color: "#64748B",
    fontSize: 13,
    lineHeight: 19,
  },
  historyDeleteButton: {
    width: 40,
    height: 44,
    marginLeft: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  historyEmptyState: {
    flex: 1,
    minHeight: 260,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 28,
  },
  historyEmptyTitle: {
    marginTop: 14,
    color: "#334155",
    fontSize: 16,
    fontWeight: "700",
  },
  historyEmptyDescription: {
    marginTop: 8,
    color: "#94A3B8",
    fontSize: 13,
    lineHeight: 20,
    textAlign: "center",
  },
});
