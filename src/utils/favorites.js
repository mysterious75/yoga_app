import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@yogafit_favorites';

export const getFavorites = async () => {
  try {
    const data = await AsyncStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : { yoga: [], food: [] };
  } catch {
    return { yoga: [], food: [] };
  }
};

export const toggleFavorite = async (type, id) => {
  try {
    const favs = await getFavorites();
    const list = favs[type] || [];
    const index = list.indexOf(id);
    if (index > -1) {
      list.splice(index, 1);
    } else {
      list.push(id);
    }
    favs[type] = list;
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
    return list;
  } catch {
    return [];
  }
};

export const isFavorite = async (type, id) => {
  const favs = await getFavorites();
  return (favs[type] || []).includes(id);
};
