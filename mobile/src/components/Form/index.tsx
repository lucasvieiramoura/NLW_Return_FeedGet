import { ArrowLeft } from 'phosphor-react-native';
import React from 'react';
import { View,TextInput, Image, Text, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';

// FeedbackType Selecionado no Widget
import { FeedbackType } from '../../components/Widget';

// Import button take a screenshot or remove ScreenShot 
import { ScreenshotButton } from '../../components/ScreenshotButton';

// Import button send Feedback
import { Button } from '../../components/Button';

//lista dos feedbacks
import {feedbackTypes}from '../../utils/feedbackTypes'

import { styles } from './styles';

interface Props{
    feedbackType: FeedbackType
}

export function Form({feedbackType}: Props) {
    //Input no feedbackTypeInfo filtrando na lista de feedbacks o feedback selecionado no Widget
    const feedbackTypeInfo = feedbackTypes[feedbackType]

  return (
    <View style={styles.container}>
        <View style={styles.header} >
            <TouchableOpacity>
                <ArrowLeft 
                    size={24}
                    weight="bold"
                    color={theme.colors.text_secondary}
                />
                
            </TouchableOpacity>
                <View style={styles.titleContainer}>
                    <Image 
                        source={feedbackTypeInfo.image}
                        style={styles.image}
                    />
                    <Text style={styles.titleText}>
                        {feedbackTypeInfo.title}
                    </Text>
                </View>
        </View>
        <TextInput 
            multiline
            style={styles.input}
            placeholder="Algo não está funcionando bem ? Queremos corrigir. Conte com detalhes o que está acontecendo..."
            placeholderTextColor={theme.colors.text_secondary}
        />
        <View style={styles.footer}>
            <ScreenshotButton 
                onTakeShot={()=> {}}
                onRemoveShot={()=> {}}
                screenshot="https://github.com/lucasvieiramoura.png"
            />
            <Button isLoading={false} />
        </View>
    </View>
  );
}