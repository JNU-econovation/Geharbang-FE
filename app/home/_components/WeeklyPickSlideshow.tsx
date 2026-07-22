import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useUnreadNotificationCount } from "@/src/hooks/notification/useNotifications";
import { useAuthStore } from "@/src/stores/auth/useAuthStore";

const SLIDE_HEIGHT = 559;
const SLIDE_INTERVAL = 3000;

const WEEKLY_PICK = [
  {
    id: 1,
    name: "스테이예스",
    address: "제주시 한경면 일주서로 4549",
    image: require("../../../public/images/weeklyPick/stayyes.png"),
  },
  {
    id: 2,
    name: "노을게스트하우스",
    address: "제주시 애월읍 신상로 258",
    image: require("../../../public/images/weeklyPick/noeul.jpeg"),
  },
  {
    id: 3,
    name: "무감각",
    address: "제주시 구좌읍 면수2길 7",
    image: require("../../../public/images/weeklyPick/mugamgak.jpeg"),
  },
  {
    id: 4,
    name: "스테이튠",
    address: "서귀포시 성산읍 성산중앙로 43",
    image: require("../../../public/images/weeklyPick/staytuned.png"),
  },
  {
    id: 5,
    name: "막내돼지",
    address: "제주시 조천읍 함덕28길 9-14",
    image: require("../../../public/images/weeklyPick/maengmaedwaeji.png"),
  },
  {
    id: 6,
    name: "도심",
    address: "제주시 구좌읍 종달로7길 8-1",
    image: require("../../../public/images/weeklyPick/dosim.png"),
  },
  {
    id: 7,
    name: "네모스테이",
    address: "제주시 한림읍 한림로 394",
    image: require("../../../public/images/weeklyPick/nemostay.jpeg"),
  },
];

const TOTAL = WEEKLY_PICK.length;
const EXTENDED_PICK = [WEEKLY_PICK[TOTAL - 1], ...WEEKLY_PICK, WEEKLY_PICK[0]];

function getWeekLabel(date: Date): string {
  const month = date.getMonth() + 1;
  const week = Math.ceil(date.getDate() / 7);
  return `${month}월 ${week}주차 PICK`;
}

export default function WeeklyPickSlideshow() {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);
  const indexRef = useRef(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isLogined = useAuthStore((state) => Boolean(state.accessToken));
  const { data: notifData } = useUnreadNotificationCount();
  const unreadCount = notifData?.unreadCount ?? 0;

  const weekLabel = React.useMemo(() => getWeekLabel(new Date()), []);
  const displayIndex = currentIndex % TOTAL;
  const current = WEEKLY_PICK[displayIndex];

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      const next = indexRef.current + 1;
      indexRef.current = next;
      scrollRef.current?.scrollTo({ x: next * SCREEN_WIDTH, animated: true });

      if (next >= TOTAL + 1) {
        setCurrentIndex(next - 1);
        setTimeout(() => {
          scrollRef.current?.scrollTo({ x: SCREEN_WIDTH, animated: false });
          indexRef.current = 1;
          setCurrentIndex(0);
        }, 400);
      } else {
        setCurrentIndex(next - 1);
      }
    }, SLIDE_INTERVAL);
  }, [SCREEN_WIDTH]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const handleMomentumScrollEnd = (e: any) => {
    const pos = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    if (pos <= 0) {
      scrollRef.current?.scrollTo({ x: TOTAL * SCREEN_WIDTH, animated: false });
      indexRef.current = TOTAL;
      setCurrentIndex(TOTAL - 1);
    } else if (pos >= TOTAL + 1) {
      scrollRef.current?.scrollTo({ x: SCREEN_WIDTH, animated: false });
      indexRef.current = 1;
      setCurrentIndex(0);
    } else {
      indexRef.current = pos;
      setCurrentIndex(pos - 1);
    }
    startTimer();
  };

  return (
    <View style={{ height: SLIDE_HEIGHT, width: SCREEN_WIDTH }}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={{ width: SCREEN_WIDTH, height: SLIDE_HEIGHT }}
        contentOffset={{ x: SCREEN_WIDTH, y: 0 }}
        onScrollBeginDrag={() => {
          if (timerRef.current) clearInterval(timerRef.current);
        }}
        onMomentumScrollEnd={handleMomentumScrollEnd}
      >
        {EXTENDED_PICK.map((gh, index) => (
          <Pressable
            key={`${gh.id}-${index}`}
            style={{ width: SCREEN_WIDTH, height: SLIDE_HEIGHT }}
            onPress={() =>
              router.push(`/guestHouse/guestHouseDetail/${gh.id}` as any)
            }
          >
            <Image
              source={gh.image}
              style={{ width: SCREEN_WIDTH, height: SLIDE_HEIGHT }}
              resizeMode='cover'
            />
          </Pressable>
        ))}
      </ScrollView>

      <View
        pointerEvents='box-none'
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      >
        <BlurView
          intensity={15}
          tint="dark"
          style={{ paddingTop: insets?.top ?? 0, paddingHorizontal: 24, paddingBottom: 16 }}
        >
          <View
            pointerEvents='box-none'
            style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
          >
            <Text style={{ color: "white", fontSize: 24, fontWeight: "600" }}>
              게하르방
            </Text>
            <View
              pointerEvents='box-none'
              style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
            >
              {!isLogined && (
                <Pressable
                  style={{
                    borderWidth: 1,
                    borderColor: "white",
                    borderRadius: 14,
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                  }}
                  onPress={() => router.push("/login" as any)}
                >
                  <Text style={{ color: "white", fontSize: 12 }}>로그인</Text>
                </Pressable>
              )}
              <Pressable
                onPress={() =>
                  router.push((isLogined ? "/notifications" : "/login") as any)
                }
              >
                <Ionicons name='notifications' size={25} color='white' />
                {unreadCount > 0 && (
                  <View
                    style={{
                      position: "absolute",
                      top: -4,
                      right: -4,
                      minWidth: 16,
                      height: 16,
                      paddingHorizontal: 3,
                      borderRadius: 8,
                      backgroundColor: "#E7000B",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ color: "white", fontSize: 9 }}>
                      {unreadCount > 99 ? "99+" : String(unreadCount)}
                    </Text>
                  </View>
                )}
              </Pressable>
            </View>
          </View>
        </BlurView>

        <Text
          pointerEvents='none'
          style={{ color: "white", fontSize: 18, fontWeight: "600", marginTop: 12, paddingHorizontal: 24 }}
        >
          {weekLabel}
        </Text>

        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.72)"]}
          pointerEvents='none'
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            paddingHorizontal: 24,
            paddingTop: 60,
            paddingBottom: 20,
          }}
        >
          <Text
            style={{ color: "white", fontSize: 32, fontWeight: "700", marginBottom: 6 }}
          >
            {current.name}
          </Text>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text
              style={{ color: "white", fontSize: 16, flex: 1, fontWeight: "600", marginRight: 12 }}
              numberOfLines={1}
              ellipsizeMode='tail'
            >
              {current.address}
            </Text>
            <Text style={{ color: "rgba(255,255,255,0.65)", fontSize: 13 }}>
              {displayIndex + 1}/{TOTAL}
            </Text>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
}
