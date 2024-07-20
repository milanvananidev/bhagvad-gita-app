import React from 'react';
import WebViewComponent from 'react-native-webview';
import {useRoute} from '@react-navigation/native';

const WebView = () => {
  const {params} = useRoute();
  const {path} = params;

  return (
    <>
      <WebViewComponent source={{uri: path}} />
    </>
  );
};

export default WebView;
