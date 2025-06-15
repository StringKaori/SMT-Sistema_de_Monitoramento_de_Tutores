export interface CustomTextInputProps {
    value: string | undefined;
    secureTextEntry?: boolean;
    onChangeText: React.Dispatch<React.SetStateAction<string | undefined>>;
    placeholder: string;
    placeholderTextColor?: string;
}