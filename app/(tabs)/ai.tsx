import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle, Path } from "react-native-svg";
import { postAiChat } from "@/src/services/ai/chat";

const BLUE = "#0EA5E9";

const suggestions = [
  { icon: "🌴", text: "애월읍 분위기 좋은 게하를 추천해주세요." },
  { icon: "🧳", text: "성산에서 단기로 일할 스텝 공고를 추천해주세요." },
  { icon: "📋", text: "게하르방에서 스텝 지원은 어떻게 하나요?" },
];

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
}

function ChatbotCharacter() {
  return (
    <Svg width={98} height={106} viewBox='0 0 98 106'>
      <Path
        d='M72 17l3.8 7.2L83 28l-7.2 3.8L72 39l-3.8-7.2L61 28l7.2-3.8L72 17z'
        fill={BLUE}
      />
      <Circle cx={87} cy={45} r={2.5} fill={BLUE} />
      <Circle cx={8} cy={73} r={2} fill={BLUE} />
      <Circle cx={12} cy={82} r={1.2} fill={BLUE} />
      <Circle cx={75} cy={95} r={1.6} fill={BLUE} />
      <Path
        d='M29 34c0-9 7-16 16-16s16 7 16 16c7 3 11 9 11 17 0 4-1 7-3 10 3 5 5 11 5 17 0 9-3 16-7 22H25c-5-6-8-13-8-22 0-5 1-10 4-15-6-3-9-8-9-14 0-7 5-13 12-14 1-1 3-1 5-1z'
        fill={BLUE}
      />
      <Circle cx={38} cy={55} r={3.5} fill='#fff' />
      <Circle cx={56} cy={55} r={3.5} fill='#fff' />
      <Path
        d='M40 64c2 5 10 5 13 0'
        fill='none'
        stroke='#fff'
        strokeWidth={3}
        strokeLinecap='round'
      />
    </Svg>
  );
}

export default function AiTabScreen() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isSending, setIsSending] = useState(false);
  const sessionIdRef = useRef<string | undefined>(undefined);
  const scrollRef = useRef<ScrollView>(null);

  const sendMessage = async (text = message) => {
    const trimmed = text.trim();
    if (!trimmed || isSending) return;
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text: trimmed,
    };
    setMessages((current) => [...current, userMessage]);
    setMessage("");
    setIsSending(true);

    try {
      const response = await postAiChat(trimmed, sessionIdRef.current);
      sessionIdRef.current = response.sessionId;
      setMessages((current) => [
        ...current,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          text: response.answer,
        },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: `error-${Date.now()}`,
          role: "assistant",
          text: "답변을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 84 : 0}
      >
        <View style={styles.header}>
          <Pressable
            accessibilityLabel='뒤로 가기'
            hitSlop={12}
            onPress={() => router.canGoBack() && router.back()}
            style={styles.backButton}
          >
            <Ionicons name='chevron-back' size={28} color='#334155' />
          </Pressable>
          <Text style={styles.headerTitle}>게하르방 챗봇</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps='handled'
          onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
          showsVerticalScrollIndicator={false}
        >
          {messages.length === 0 ? (
            <View style={styles.emptyState}>
              <ChatbotCharacter />
              <Text style={styles.welcomeTitle}>
                제주도 여행에 궁금한 점이 있나요?
              </Text>
              <Text style={styles.description}>
                게스트하우스부터 스텝 공고, 이용 안내까지{"\n"}
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
                      <Text style={styles.suggestionIcon}>{suggestion.icon}</Text>
                      <Text style={styles.suggestionText}>{suggestion.text}</Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.messages}>
              {messages.map((item) =>
                item.role === "user" ? (
                  <View key={item.id} style={styles.userBubble}>
                    <Text style={styles.userBubbleText}>{item.text}</Text>
                  </View>
                ) : (
                  <View key={item.id} style={styles.botBubble}>
                    <Text style={styles.botBubbleText}>{item.text}</Text>
                  </View>
                ),
              )}
              {isSending && (
                <View style={styles.loadingBubble}>
                  <ActivityIndicator size='small' color={BLUE} />
                  <Text style={styles.loadingText}>답변을 찾고 있어요</Text>
                </View>
              )}
            </View>
          )}
        </ScrollView>

        <View style={styles.inputBar}>
          <Pressable accessibilityLabel='첨부하기' style={styles.addButton}>
            <Ionicons name='add' size={30} color='#111827' />
          </Pressable>
          <View style={styles.inputContainer}>
            <TextInput
              value={message}
              onChangeText={setMessage}
              editable={!isSending}
              onSubmitEditing={() => void sendMessage()}
              placeholder='무엇이든 물어보세요'
              placeholderTextColor='#D1D5DB'
              returnKeyType='send'
              style={styles.input}
            />
            <Pressable
              accessibilityLabel='메시지 보내기'
              disabled={!message.trim() || isSending}
              onPress={() => void sendMessage()}
              style={[
                styles.sendButton,
                (!message.trim() || isSending) && styles.sendButtonDisabled,
              ]}
            >
              <Ionicons name='arrow-up' size={21} color='#FFFFFF' />
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
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
    flex: 1,
    color: "#111827",
    fontFamily: "SpaceMono",
    fontSize: 21,
    textAlign: "center",
  },
  headerSpacer: { width: 42 },
  scrollContent: { flexGrow: 1 },
  emptyState: { flex: 1, alignItems: "center", paddingHorizontal: 16 },
  welcomeTitle: {
    marginTop: 17,
    color: BLUE,
    fontFamily: "SpaceMono",
    fontSize: 19,
    fontWeight: "700",
    textAlign: "center",
  },
  description: {
    marginTop: 10,
    color: "#111827",
    fontFamily: "SpaceMono",
    fontSize: 14,
    lineHeight: 24,
    textAlign: "center",
  },
  suggestionSection: { width: "100%", marginTop: 80 },
  dividerRow: { flexDirection: "row", alignItems: "center", gap: 16 },
  divider: { flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: "#CBD5E1" },
  dividerText: {
    color: "#9CA3AF",
    fontFamily: "SpaceMono",
    fontSize: 14,
    fontWeight: "600",
  },
  suggestionList: { alignItems: "center", gap: 10, marginTop: 18 },
  suggestion: {
    minHeight: 40,
    maxWidth: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E3E7",
    borderRadius: 22,
    paddingHorizontal: 13,
    backgroundColor: "#FFFFFF",
  },
  suggestionPressed: { backgroundColor: "#F0F9FF", borderColor: "#BAE6FD" },
  suggestionIcon: { marginRight: 6, fontSize: 19 },
  suggestionText: { color: "#6B7280", fontFamily: "SpaceMono", fontSize: 14 },
  messages: { flex: 1, padding: 20, gap: 12 },
  userBubble: {
    alignSelf: "flex-end",
    maxWidth: "82%",
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 20,
    borderBottomRightRadius: 5,
    backgroundColor: BLUE,
  },
  userBubbleText: { color: "#FFFFFF", fontFamily: "SpaceMono", fontSize: 15, lineHeight: 22 },
  botBubble: {
    alignSelf: "flex-start",
    maxWidth: "82%",
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 20,
    borderBottomLeftRadius: 5,
    backgroundColor: "#F1F5F9",
  },
  botBubbleText: { color: "#334155", fontFamily: "SpaceMono", fontSize: 15, lineHeight: 22 },
  loadingBubble: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: "#F1F5F9",
  },
  loadingText: { color: "#64748B", fontFamily: "SpaceMono", fontSize: 13 },
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
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
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 23,
    backgroundColor: "#F5F7FA",
    paddingLeft: 17,
    paddingRight: 5,
  },
  input: { flex: 1, color: "#111827", fontFamily: "SpaceMono", fontSize: 15, paddingVertical: 0 },
  sendButton: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 17,
    backgroundColor: "#111111",
  },
  sendButtonDisabled: { opacity: 0.35 },
});
