import { router } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";

import GuestHouse from "@/public/svgs/home/guestHouse.svg";
import { GuestHouseCard } from "@/src/types/models/GuestHouseCard";
import { regions } from "@/src/utils/constants/regions";
import HorizontalSlider from "./HorizontalSlider";
import { ItemCard } from "./ItemCard";
import { ListLinkButton } from "./ListLinkButton";
import MoreCard from "./MoreCard";
import RegionTab from "./RegionTab";

interface GuestHouseData {
  [key: string]: GuestHouseCard[];
}

export function GuesthouseSection() {
  //임시 데이터
   const guestHouses: GuestHouseData = {
  '제주시': [
    { id: 1, name: '제주 센트럴 스테이', imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop', tags: ['활발한', '감성적'] },
    { id: 2, name: '도심 속 힐링하우스', imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=300&fit=crop', tags: ['조용한', '힐링'] },
    { id: 3, name: '제주 오션뷰 하우스', imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop', tags: ['바다', '감성적'] },
    { id: 4, name: '한라산 뷰 스테이', imageUrl: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400&h=300&fit=crop', tags: ['산', '조용한'] },
    { id: 5, name: '제주 전통 한옥', imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=300&fit=crop', tags: ['전통', '힐링'] },
  
  ],
  '서귀포시': [
    { id: 12, name: '중문 리조트 하우스', imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop', tags: ['리조트', '활발한'] },
    { id: 13, name: '섭지코지 뷰', imageUrl: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400&h=300&fit=crop', tags: ['감성적', '바다'] },
    { id: 14, name: '서귀포 한옥 스테이', imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=300&fit=crop', tags: ['전통', '조용한'] },
    { id: 15, name: '폭포 근처 펜션', imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=300&fit=crop', tags: ['자연', '힐링'] },
    { id: 16, name: '서귀포 모던 하우스', imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop', tags: ['모던', '감성적'] },
  ],
  '서부권': [
    { id: 22, name: '협재 비치 하우스', imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop', tags: ['해변', '힐링'] },
    { id: 23, name: '서부 전통 한옥', imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=300&fit=crop', tags: ['전통', '감성적'] },
    { id: 24, name: '금능 오션뷰', imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop', tags: ['바다', '모던'] },
    { id: 25, name: '곽지 비치 펜션', imageUrl: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400&h=300&fit=crop', tags: ['해변', '활발한'] },
    { id: 26, name: '서부 힐링 스테이', imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=300&fit=crop', tags: ['힐링', '조용한'] },
  ],
  '동부권': [
    { id: 32, name: '우도 뷰 펜션', imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop', tags: ['섬', '바다'] },
    { id: 33, name: '동부 힐링 스테이', imageUrl: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400&h=300&fit=crop', tags: ['힐링', '조용한'] },
    { id: 34, name: '표선 비치 하우스', imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=300&fit=crop', tags: ['해변', '활발한'] },
    { id: 35, name: '섭지코지 펜션', imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=300&fit=crop', tags: ['전망', '감성적'] },
    { id: 36, name: '성산 전통 한옥', imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop', tags: ['전통', '조용한'] },
  ],
  '중문/대정': [
    { id: 42, name: '대정 바다 하우스', imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop', tags: ['바다', '조용한'] },
    { id: 43, name: '중문 오션뷰 빌라', imageUrl: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400&h=300&fit=crop', tags: ['바다', '럭셔리'] },
    { id: 44, name: '대정 전통 스테이', imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=300&fit=crop', tags: ['전통', '감성적'] },
    { id: 45, name: '중문 모던 하우스', imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=300&fit=crop', tags: ['모던', '활발한'] },
    { id: 46, name: '대정 힐링 펜션', imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop', tags: ['힐링', '조용한'] },
  ],
  '도서지역': [
    { id: 52, name: '비양도 스테이', imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop', tags: ['섬', '조용한'] },
    { id: 53, name: '우도 전망 펜션', imageUrl: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400&h=300&fit=crop', tags: ['전망', '감성적'] },
    { id: 54, name: '가파도 힐링 하우스', imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=300&fit=crop', tags: ['섬', '힐링'] },
    { id: 55, name: '우도 모던 빌라', imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=300&fit=crop', tags: ['모던', '섬'] },
    { id: 56, name: '추자도 바다 스테이', imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop', tags: ['섬', '바다'] },
  ],
};
  const [selectedRegion, setSelectedRegion] = useState("제주시");

  const currentGuestHouses = guestHouses[selectedRegion];

  return (
    <View className="w-full items-center gap-3 mt-6 mb-14">
      {/* 추후 라우터는 변경 예정*/}
      <ListLinkButton label="게스트하우스 찾기" icon={<GuestHouse/>} onPress={() => router.push("/step")}/> 
      <HorizontalSlider
        data={regions}
        renderItem={(region) => (
          <RegionTab
            key={region}
            label={region}
            selected={selectedRegion === region}
            onPress={() => setSelectedRegion(region)}
          />
        )}
      />

      <HorizontalSlider
        data={currentGuestHouses}
        renderItem={(house) => <ItemCard key={house.id} {...house} type="guestHouse" />}
        renderMoreCard={<MoreCard onPress={() => router.push("/step")} />}
      />
    </View>
  );
}
