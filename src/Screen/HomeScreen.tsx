// HomeScreen.tsx
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import axios from 'axios';

// Shape of each object returned by https://picsum.photos/v2/list
type PicsumImage = {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
};

const API_URL = 'https://picsum.photos/v2/list';
const PAGE_LIMIT = 20; // items per page

const HomeScreen = () => {
  const insets = useSafeAreaInsets();

  const [images, setImages] = useState<PicsumImage[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ---- Fetch data ----
  const fetchImages = useCallback(
    async (pageNumber: number, replace = false) => {
      try {
        if (replace) setRefreshing(true);
        else setLoading(true);
        setError(null);

        const response = await axios.get<PicsumImage[]>(API_URL, {
          params: { page: pageNumber, limit: PAGE_LIMIT },
        });

        const newItems = response.data;

        setImages(prev => (replace ? newItems : [...prev, ...newItems]));
      } catch (err) {
        console.warn('Picsum fetch error:', err);
        setError('Could not load images. Pull down to retry.');
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [],
  );

  // Initial load
  useEffect(() => {
    fetchImages(1, true);
  }, [fetchImages]);

  // ---- Handlers ----
  const handleRefresh = () => {
    setPage(1);
    fetchImages(1, true);
  };

  const handleLoadMore = () => {
    if (loading || refreshing) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchImages(nextPage);
  };

  // ---- Render item ----
  const renderItem = ({ item }: { item: PicsumImage }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.85}>
      <Image
        source={{ uri: item.download_url }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.cardBody}>
        <Text style={styles.author} numberOfLines={1}>
          {item.author}
        </Text>
        <Text style={styles.dimensions}>
          {item.width} × {item.height}
        </Text>
      </View>
    </TouchableOpacity>
  );

  // ---- Empty state ----
  const renderEmpty = () => {
    if (loading) return null;
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>{error ?? 'No images found.'}</Text>
      </View>
    );
  };

  // ---- Footer loader ----
  const renderFooter = () => {
    if (!loading || refreshing) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#4F46E5" />
      </View>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.heading}>Explore Images</Text>

      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: insets.bottom + 24 },
        ]}
        showsVerticalScrollIndicator={false}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.4}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#4F46E5']}
            tintColor="#4F46E5"
          />
        }
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1D1F',
    paddingHorizontal: 16,
    // paddingTop: 12,
    paddingBottom: 8,
  },
  listContent: {
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },

  /* Card */
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    marginBottom: 12,
    marginHorizontal: 4,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 140,
    backgroundColor: '#E1E5EA',
  },
  cardBody: {
    padding: 10,
  },
  author: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1D1F',
  },
  dimensions: {
    fontSize: 11,
    color: '#9AA0A6',
    marginTop: 2,
  },

  /* Empty / error */
  emptyContainer: {
    paddingVertical: 60,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#6C7278',
    textAlign: 'center',
    paddingHorizontal: 24,
  },

  /* Footer loader */
  footerLoader: {
    paddingVertical: 16,
    alignItems: 'center',
  },
});
