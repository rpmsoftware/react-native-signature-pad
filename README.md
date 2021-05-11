# react-native-signature-pad

[![npm version](https://badge.fury.io/js/react-native-signature-pad.svg)](//npmjs.com/package/react-native-signature-pad)
[![star this repo](http://githubbadges.com/star.svg?user=kevinstumpf&repo=react-native-signature-pad&style=flat)](https://github.com/kevinstumpf/react-native-signature-pad) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) [![All Contributors](https://img.shields.io/badge/all_contributors-12-orange.svg?style=flat-square)](#contributors) [![Known Vulnerabilities](https://snyk.io/test/github/kevinstumpf/react-native-signature-pad/badge.svg?style=flat-square)](https://snyk.io/test/github/kevinstumpf/react-native-signature-pad) 

React Native wrapper around @[szimek's](https://github.com/szimek) HTML5 Canvas based [Signature Pad](https://github.com/szimek/signature_pad)

- Supports Android and iOS
- Pure JavaScript implementation with no native dependencies
- Tested with RN > 0.58 (v0.0.9 tested with RN 0.40)
- Can easily be rotated using the "transform" style
- Generates a base64 encoded png image of the signature

## Demo

![SignaturePadDemo](https://cloud.githubusercontent.com/assets/7293984/13297035/303fefc6-dae5-11e5-99e8-edb8335633b5.gif) ![SignaturePadDemoAndroid](https://cloud.githubusercontent.com/assets/7293984/13299954/72bc3bf4-daf2-11e5-8606-388c05c26d6d.gif)

## Installation

```sh
$ yarn add react-native-signature-pad
```

`react-native-signature-pad` needs `react-native-webview` to work so add that as well.
```sh
$ yarn add react-native-webview
```

## Using a Custom Signature Font

There is an option to generate a signature based off the user's name. You can use your own custom font. Currently, we recommend converting your font file into a data URL (we used [dataurl.net](http://dataurl.net/#dataurlmaker)). Store that in a .js file with the contents similar to something like below:

```js
var content = `
  @font-face {
    font-family: 'SignatureFont';
    src: url(/* data url of your font */) format(/* orig font file type i.e. 'ttf' */);
  }
`;

export default content;
```

## Generating a Signature from a String

If you would like to generate a signature as opposed to manually writing your own, you can enable the `useFont` prop to `true` and use the prop `name` where the generated signature will be based from.

```js
...

var signatureFont = require('./signature-font');

...

var aName = 'John Doe';

<SignaturePad
  ...
  useFont={true}
  name={aName}
  fontStyle={signatureFont}
/>
```

## Example

```js
import React, {Component} from 'react';
import {View} from 'react-native';
import SignaturePad from 'react-native-signature-pad';

var penMinWidth = 2;  // Default value: 1
var penMaxWidth = 3;  // Default value: 4

export default class Demo extends Component {
  render = () => {
    return (
      <View style={{flex: 1}}>
        <SignaturePad
          onError={this._signaturePadError}
          onChange={this._signaturePadChange}
          penMinWidth={penMinWidth}
          penMaxWidth={penMaxWidth}
          style={{flex: 1, backgroundColor: 'white'}}
          useFont={false}
        />
      </View>
    )
  };

  _signaturePadError = (error) => {
    console.error(error);
  };

  _signaturePadChange = ({base64DataUrl}) => {
    console.log("Got new signature: " + base64DataUrl);
  };
}
```

## Android 7 WebView Changes

Google changed the default behaviour for WebViews with Android 7 (Nougat). In apps that use WebViews, it no longer uses the WebView APK in previous versions but instead it uses the Chrome WebView.

Source: https://developer.android.com/about/versions/nougat/android-7.0.html#webview

Because of this, WebView's `onMessage` prop replaces `onChange` previously used. However, `onMessage` was not implemented in React Native WebView until React Native v0.37. 
