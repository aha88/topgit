import { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, StyleSheet, View, Image, TouchableOpacity, Linking } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import axios from 'axios';
import { FontAwesome } from '@expo/vector-icons';
import {styles } from '../styles/globalStyles'
import { fetchRepositories } from '@/services/gitapi';
interface Repository {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  html_url: string;
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
}

export default function HomeScreen() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  useEffect(() => {
    loadRepositories(1);
  }, []);

  const loadRepositories = async (page: number) => {
    if (isFetchingMore) return;

    setIsFetchingMore(true);
    try {
      const response = await fetchRepositories(page);
      setRepositories((prevRepos) => [...prevRepos, ...response]);
      setPage(page);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsFetchingMore(false);
      setLoading(false);
    }
  };

  const openRepository = (url: string) => {
    Linking.openURL(url);
  };

  const handleLoadMore = () => {
    loadRepositories(page + 1);
  };

  const renderItem = ({ item }: { item: Repository }) => (
    <ThemedView style={styles.item}>
      <TouchableOpacity onPress={() => openRepository(item.html_url)} activeOpacity={0.7}>
        <ThemedText type="title" style={styles.repoName}>
          {item.name}
        </ThemedText>
      </TouchableOpacity>

      <ThemedText type="default" style={styles.repoDescription}>
        {item.description || 'No description available'}
      </ThemedText>

      <View style={styles.repoOwner}>
        <TouchableOpacity onPress={() => openRepository(item.owner.html_url)} activeOpacity={0.7}>
          <View style={styles.ownerContainer}>
            <Image source={{ uri: item.owner.avatar_url }} style={styles.avatar} />
            <ThemedText style={styles.ownerName}>{item.owner.login}</ThemedText>
          </View>
        </TouchableOpacity>

        <View style={styles.starContainer}>
          <FontAwesome name="star" size={18} color="#FFD700" />
          <ThemedText style={styles.repoStars}>{item.stargazers_count}</ThemedText>
        </View>
      </View>
    </ThemedView>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title} type="title">
        Top Trending GitHub Repositories
      </ThemedText>

      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <FlatList
          data={repositories}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={isFetchingMore ? <ActivityIndicator size="small" color="#000" /> : null}
        />
      )}
    </ThemedView>
  );
};


