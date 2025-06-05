import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  fullWidth = false,
}) => {
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    };

    if (fullWidth) {
      baseStyle.width = '100%';
    }

    switch (size) {
      case 'small':
        baseStyle.paddingVertical = 8;
        baseStyle.paddingHorizontal = 16;
        baseStyle.minHeight = 36;
        break;
      case 'large':
        baseStyle.paddingVertical = 16;
        baseStyle.paddingHorizontal = 24;
        baseStyle.minHeight = 56;
        break;
      default:
        baseStyle.paddingVertical = 12;
        baseStyle.paddingHorizontal = 20;
        baseStyle.minHeight = 48;
    }

    if (variant === 'outline') {
      baseStyle.borderWidth = 2;
      baseStyle.borderColor = disabled ? '#E0E0E0' : '#007AFF';
      baseStyle.backgroundColor = 'transparent';
    } else if (variant === 'secondary') {
      baseStyle.backgroundColor = disabled ? '#F5F5F5' : '#F0F0F0';
    } else if (variant === 'danger') {
      baseStyle.backgroundColor = disabled ? '#FFE0E0' : '#FF3B30';
    }

    if (disabled) {
      baseStyle.opacity = 0.6;
    }

    return baseStyle;
  };

  const getTextStyle = (): TextStyle => {
    const baseTextStyle: TextStyle = {
      fontWeight: '600',
      textAlign: 'center',
    };

    switch (size) {
      case 'small':
        baseTextStyle.fontSize = 14;
        break;
      case 'large':
        baseTextStyle.fontSize = 18;
        break;
      default:
        baseTextStyle.fontSize = 16;
    }

    switch (variant) {
      case 'outline':
        baseTextStyle.color = disabled ? '#A0A0A0' : '#007AFF';
        break;
      case 'secondary':
        baseTextStyle.color = disabled ? '#A0A0A0' : '#333333';
        break;
      case 'danger':
        baseTextStyle.color = '#FFFFFF';
        break;
      default:
        baseTextStyle.color = '#FFFFFF';
    }

    return baseTextStyle;
  };

  const renderContent = () => (
    <>
      {loading && (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' || variant === 'secondary' ? '#007AFF' : '#FFFFFF'}
          style={{ marginRight: 8 }}
        />
      )}
      <Text style={[getTextStyle(), textStyle]}>
        {loading ? 'Loading...' : title}
      </Text>
    </>
  );

  if (variant === 'primary' && !disabled) {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        style={[style]}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={['#007AFF', '#0056CC']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={getButtonStyle()}
        >
          {renderContent()}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[getButtonStyle(), style]}
      activeOpacity={0.8}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

export default Button;