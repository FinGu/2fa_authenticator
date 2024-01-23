import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Constants from '../../Constants';

const QRCode = ({ on_scanned }: {
  on_scanned: (data: any) => void
}) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }: {
      type: string,
      data: string
  }) => {
    setScanned(true);

    if(type !== 'org.iso.QRCode'){
        return
    }

    on_scanned(data)

    setTimeout(() => {
      setScanned(false)
    }, 500)
  };

  if (hasPermission === null) {
      return <Text>{Constants.Pages.QRCode.Texts.RequestPermission}</Text>;
  }

  if (hasPermission === false) {
      return <Text>{Constants.Pages.QRCode.Texts.NoCameraAccess}</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export default QRCode;

