import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Header from '../layout/Header';
import BookmarkCard from '../components/bookmarks/BookmarkCard';
import NoBookMarks from '../components/bookmarks/NoBookMarks';

function BookMarks() {
  const { t } = useTranslation();
  const bookmarks = useSelector((state) => state?.meta?.bookmarks);
  const [update, setUpdate] = useState(update);

  if (bookmarks?.length <= 0) {
    return <NoBookMarks />;
  };

  return (
    <View style={{ marginTop: 20, marginHorizontal: 10 }}>
      <Header title={t('tabs.Bookmarks')} />
      <FlatList
        key={update}
        data={bookmarks}
        renderItem={({ item }) => <BookmarkCard item={item} setUpdate={setUpdate} />}
        contentContainerStyle={{ paddingBottom: 100, marginHorizontal: 15, marginTop: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

export default BookMarks;
