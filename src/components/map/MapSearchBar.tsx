import { Ionicons } from '@expo/vector-icons';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, Pressable, Text, TextInput, View } from 'react-native';
import { GuestHouseMapItem, StepMapItem } from '@/src/types/models/map';
import { COLORS } from '@/src/utils/constants/colors';

type MapItem = StepMapItem | GuestHouseMapItem;

const getDisplayName = (item: MapItem) => item.guestHouseName;

interface MapSearchBarProps {
  items: MapItem[];
  onSelect: (item: MapItem) => void;
  placeholder?: string;
}

export default function MapSearchBar({ items, onSelect, placeholder = '검색' }: MapSearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<MapItem[]>([]);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const search = useCallback(
    (text: string) => {
      if (!text.trim()) {
        setResults([]);
        return;
      }
      const lower = text.toLowerCase();
      setResults(
        items.filter((item) => {
          const name = getDisplayName(item).toLowerCase();
          return (
            name.includes(lower) ||
            item.guestHouseName.toLowerCase().includes(lower) ||
            item.address.toLowerCase().includes(lower)
          );
        }),
      );
    },
    [items],
  );

  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => search(query), 400);
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [query, search]);

  // mapType 변경 시 검색어/결과 초기화
  useEffect(() => {
    setQuery('');
    setResults([]);
  }, [placeholder]);

  const handleSelect = (item: MapItem) => {
    setQuery(getDisplayName(item));
    setResults([]);
    onSelect(item);
  };

  return (
    <View style={{ marginHorizontal: 16 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'white',
          borderRadius: 10,
          paddingHorizontal: 12,
          height: 48,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.12,
          shadowRadius: 4,
          elevation: 4,
          zIndex: 20,
        }}
      >
        <Ionicons name='search-outline' size={18} color={COLORS.GRAY.PLACEHOLDER} />
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={COLORS.GRAY.PLACEHOLDER}
          value={query}
          onChangeText={setQuery}
          style={{ flex: 1, marginLeft: 8, fontSize: 15, color: '#101828' }}
          returnKeyType='search'
        />
        {query.length > 0 && (
          <Pressable onPress={() => { setQuery(''); setResults([]); }}>
            <Ionicons name='close-circle' size={18} color={COLORS.GRAY.PLACEHOLDER} />
          </Pressable>
        )}
      </View>

      {results.length > 0 && (
        <View style={{ position: 'absolute', top: 52, left: 0, right: 0, zIndex: 30 }}>
          <FlatList
            data={results}
            keyExtractor={(item) => String(item.id)}
            keyboardShouldPersistTaps='handled'
            style={{
              backgroundColor: 'white',
              borderRadius: 8,
              maxHeight: 220,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 10,
            }}
            renderItem={({ item, index }) => (
              <Pressable
                onPress={() => handleSelect(item)}
                style={{
                  padding: 12,
                  borderBottomWidth: index < results.length - 1 ? 1 : 0,
                  borderBottomColor: COLORS.GRAY.BORDER,
                }}
              >
                <Text style={{ fontSize: 14, color: '#101828', fontWeight: '500' }}>
                  {getDisplayName(item)}
                </Text>
                <Text style={{ fontSize: 12, color: COLORS.GRAY.TEXT, marginTop: 2 }}>
                  {item.address}
                </Text>
              </Pressable>
            )}
          />
        </View>
      )}
    </View>
  );
}
