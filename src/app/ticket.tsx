import { useState } from "react";
import {
  Alert,
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Modal
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import { Header } from "@/components/Header";
import { Credential } from "@/components/credential";
import { colors } from "@/styles/colors";
import { Button } from "@/components/Button";
import { QRCode } from "@/components/Qrcode";
import { useBadgeStore } from "@/store/badge-store";

import { Redirect } from "expo-router";

export default function Ticket() {
  const [image, setImage] = useState("");
  const [expandeQRCode, setExpandeQRCode] = useState(false);

  const badgeStore = useBadgeStore();

  async function handleSelectImage() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4]
      });

      if (result.assets) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error)
      Alert.alert("Foto", "Não foi possível selecionar a imagem!")
    }
  }

  if (!badgeStore.data?.checkInURL) {
    return <Redirect href="/" />
  }

  return (
    <View className="flex-1 bg-green-500">
      <StatusBar barStyle="light-content" />

      <Header title="Minha credencial" />
      <ScrollView
        className="-mt-28 -z-10"
        contentContainerClassName="px-8 pb-8"
        showsVerticalScrollIndicator={false}
      >
        <Credential
          image={image}
          onChangeAvatar={handleSelectImage}
          onExpandeQRCode={() => setExpandeQRCode(true)}
        />

        <FontAwesome
          name="angle-double-down"
          size={24}
          color={colors.gray[300]}
          className="self-center my-6"
        />

        <Text className="text-white font-bold text-2xl mt-4">
          Compartilhar credencial
        </Text>

        <Text className="text-white font-regular text-base mt-1 mb-6">
          Mostre ao mundo que você vai participar do Unite Summit!
        </Text>

        <Button title="Compartilhar" />

        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            marginTop: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
          onPress={() => badgeStore.remove()}
        >
          <Text className="text-base text-white font-bold text-content">Remover Ingresso</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={expandeQRCode}
        statusBarTranslucent
        animationType="slide"
      >
        <View className="flex-1 bg-green-500 items-center justify-center">
          <QRCode
            value="teste"
            size={300}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setExpandeQRCode(false)}
            style={{
              marginTop: 40
            }}
          >
            <Text className="text-sm text-orange-500 font-bold text-center">Fechar QRCode</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  )
}