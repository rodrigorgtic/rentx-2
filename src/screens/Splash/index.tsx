import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import BrandSvg from '../../assets/brand.svg';
import LogoSvg from '../../assets/logo.svg';
import { Container } from './styles';

export function Splash() {
  const navigation = useNavigation<any>();

  const splashAnimation = useSharedValue(0); //0 -> 50

  const brandStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 50], [1, 0]),
      transform: [
        {
          translateX: interpolate(
            splashAnimation.value,
            [0, 50],
            [0, -50],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 25, 50], [0, 0.3, 1]),
      transform: [
        {
          translateX: interpolate(
            splashAnimation.value,
            [0, 50],
            [-50, 0],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  function startApp() {
    navigation.navigate('SignIn');
  }

  useEffect(() => {
    let isMounted = true;

    if (!isMounted) {
      splashAnimation.value = withTiming(50, { duration: 2000 }, () => {
        'worklet';
        runOnJS(startApp)();
      });
    }


    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Container>
      <Animated.View style={[brandStyle, { position: 'absolute' }]}>
        <BrandSvg width={80} height={50} />
      </Animated.View>
      <Animated.View style={[logoStyle, { position: 'absolute' }]}>
        <LogoSvg width={120} height={80} />
      </Animated.View>
    </Container>
  );
}
