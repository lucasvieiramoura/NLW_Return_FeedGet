import React,{useState} from 'react';
import { ArrowLeft } from 'phosphor-react-native';
import { View,TextInput, Image, Text, TouchableOpacity } from 'react-native';
import {captureScreen} from 'react-native-view-shot'
import * as FileSystem from 'expo-file-system'

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
import { RotateOutDownRight } from 'react-native-reanimated';
import { api } from '../../libs/api';

interface Props{
    feedbackType: FeedbackType;
    onFeedbackCanceled: () => void;
    onFeedbackSent: () => void;

}

export function Form({feedbackType, onFeedbackCanceled,onFeedbackSent }: Props) {
    const [screenshot, setScreenshot] = useState<string |null>(null)
    const [isSendingFeedback, setIsSendingFeedback ] = useState(false)
    const [comment,setComment] = useState("")

    //Input no feedbackTypeInfo filtrando na lista de feedbacks o feedback selecionado no Widget
    const feedbackTypeInfo = feedbackTypes[feedbackType]

    function handleScreenShot(){
        captureScreen({
            format: 'jpg',
            quality: 0.8
        })
        .then( uri => setScreenshot(uri))
        .catch( error => console.log(error))
    }

    function handleScreenShotRemove(){
        setScreenshot(null);
    }

    async function hanldeSendFeedback () {
        if(isSendingFeedback){
            return;
        }
        setIsSendingFeedback(true);
        const screenshotBase64 = screenshot && await FileSystem.readAsStringAsync(screenshot, {encoding: 'base64'});

        try { 
            await api.post('/feedbacks',{
                type: feedbackType,
                comment,  // sempre que a var??avel recebimento for igual a var??avel que contem a informa????o pode-se passar apenas a var??avel.                
                screenshot: `data:image/png;base64,${screenshotBase64}`
            }); 
            onFeedbackSent();
            
        } catch (e) {
            console.log(e);
            setIsSendingFeedback(false);
        }
    }

  return (
    <View style={styles.container}>
        <View style={styles.header} >
            <TouchableOpacity onPress={onFeedbackCanceled} >
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
            placeholder="Algo n??o est?? funcionando bem ? Queremos corrigir. Conte com detalhes o que est?? acontecendo..."
            placeholderTextColor={theme.colors.text_secondary}
            onChangeText={setComment}
        />
        <View style={styles.footer}>
            <ScreenshotButton 
                onTakeShot={handleScreenShot}
                onRemoveShot={handleScreenShotRemove}
                screenshot={ screenshot}
            />
            <Button 
                onPress={hanldeSendFeedback}
                isLoading={isSendingFeedback} 
            />
        </View>
    </View>
  );
}