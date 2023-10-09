import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import {
  Stack,
  useRouter,
  useLocalSearchParams,
  useGlobalSearchParams,
} from "expo-router";
import { useCallback, useState } from "react";

import {
  Company,
  JobAbout,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from "../../components";

import { COLORS, icons, SIZES } from "../../constants";
import { useFetch } from "../../hook/useFetch";

const JobDetails = () => {
  const [refreshing, setRefreshing] = useState(false);

  const localParams = useLocalSearchParams();
  const globalParams = useGlobalSearchParams();
  const router = useRouter();

  const { data, isLoading, error, refetch } = useFetch("job-details", {
    job_id: localParams.id,
  });

  const onRefresh = () => {};

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => {
            return (
              <ScreenHeaderBtn
                dimension="60%"
                iconUrl={icons.left}
                handlePress={() => router.back()}
              />
            );
          },
          headerRight: () => {
            return (
              <ScreenHeaderBtn
                dimension="60%"
                iconUrl={icons.share}
                handlePress={() => console.log("Shared")}
              />
            );
          },
          headerTitle: "",
        }}
      />
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : data.length === 0 ? (
            <Text>No Data</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
                <Company 
                companyLogo={data[0].employer_logo}
                jobTitle={data[0].job_title}
                companyName={data[0].employer_name}
                location={data[0].job_country}
                />

                <JobTabs 
                
                />
            </View>
          )}
        </ScrollView>
      </>
    </SafeAreaView>
  );
};

export default JobDetails;
