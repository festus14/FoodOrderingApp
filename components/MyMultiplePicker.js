import React, {Component} from 'react';
import {View} from 'react-native';
import MultiSelect from 'react-native-multiple-select';

class MyMultiplePicker extends Component {
  //   onSelectedItemsChange = (selectedItems) => {
  //     this.setState({selectedItems});
  //   };

  render() {
    const {selectedItems, items, onSelectedItemsChange} = this.props;

    return (
      <View style={{flex: 1, marginBottom: 20}}>
        <MultiSelect
          items={items}
          uniqueKey="id"
          onSelectedItemsChange={onSelectedItemsChange}
          selectedItems={selectedItems}
          selectText="Days open"
          searchInputPlaceholderText="Search days..."
          // onChangeInput={(text) => console.log(text)}
          altFontFamily="ProximaNova-Light"
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{color: '#CCC'}}
          submitButtonColor="#CCC"
          submitButtonText="Save"
          tagContainerStyle={{height: 30, width: 100}}
          styleTextTag={{fontSize: 10}}
        />
      </View>
    );
  }
}

export default MyMultiplePicker;
