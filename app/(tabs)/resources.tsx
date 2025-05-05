
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { theme, globalStyles } from "@/constants/theme";
import Colors from "@/constants/colors";
import { SearchBar } from "@/components/SearchBar";
import { ResourceCard, ResourceType } from "@/components/ResourceCard";
import { resources } from "@/mocks/resources";

export default function ResourcesScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filteredResources, setFilteredResources] = React.useState<ResourceType[]>(resources);

  React.useEffect(() => {
    if (searchQuery) {
      const filtered = resources.filter(
        (resource) =>
          resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          resource.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredResources(filtered);
    } else {
      setFilteredResources(resources);
    }
  }, [searchQuery]);

  const handleResourcePress = (resource: ResourceType) => {
    router.push(`/resource/${resource.id}`);
  };

  return (
    <SafeAreaView style={globalStyles.safeArea} edges={["bottom"]}>
      <View style={styles.container}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search for first aid resources..."
        />

        <FlatList
          data={filteredResources}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ResourceCard resource={item} onPress={handleResourcePress} />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.md,
    backgroundColor: Colors.background,
  },
  listContent: {
    paddingBottom: theme.spacing.lg,
  },
});