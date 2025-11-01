import React from "react";
import { ScrollView } from "react-native";

import CustomSafeAreaView from "@/src/components/layout/CustomSafeAreaView";
import LoginBody from "./_components/LoginBody";
import LoginFooter from "./_components/LoginFooter";
import LoginHeader from "./_components/LoginHeader";

export default function Login() {
  return (
    <>
      <CustomSafeAreaView pageColor='bg-gray-50'>
        <ScrollView>
          <LoginHeader />
          <LoginBody />
        </ScrollView>
      </CustomSafeAreaView>

      <LoginFooter />
    </>
  );
}
