import React from "react";
import { ScrollView } from "react-native";

import CustomSafeAreaView from "@/src/components/layout/CustomSafeAreaView";
import LoginBody from "./_components/LoginBody/LoginBody";
import LoginFooter from "./_components/LoginFooter";
import LoginHeader from "./_components/LoginHeader";

export default function Login() {
  return (
    <>
      <CustomSafeAreaView
        pageColor='bg-white'
        statusBarBackgroundColor='bg-[#0EA5E9]'
      >
        <ScrollView className='flex-1'>
          <LoginHeader />
          <LoginBody />
          <LoginFooter />
        </ScrollView>
      </CustomSafeAreaView>
    </>
  );
}
