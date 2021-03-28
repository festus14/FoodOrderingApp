import React from 'react';
import {FlatList} from 'react-native';

export default function VirtualizedView(props) {
  return (
    <FlatList
      data={[]}
      ListEmptyComponent={null}
      keyExtractor={() => 'dummy'}
      renderItem={null}
      ListHeaderComponent={<>{props.children}</>}
    />
  );
}
