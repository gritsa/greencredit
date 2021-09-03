import { StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import AvatarComponent from '../../components/avatar/avatar.component';
import { Color } from '../../shared/utils/colors-pack';

const PopularComponent = (props) => {
    state = [
        {
            profile_pic: require('../../assets/images/avatar-1.png'),
            name: 'Pradeep'
        },
        {
            profile_pic: require('../../assets/images/avatar-1.png'),
            name: 'Pradeep'
        },
        {
            profile_pic: require('../../assets/images/avatar-1.png'),
            name: 'Pradeep'
        },
        {
            profile_pic: require('../../assets/images/avatar-1.png'),
            name: 'Pradeep'
        },
        {
            profile_pic: require('../../assets/images/avatar-1.png'),
            name: 'Pradeep'
        },
        {
            profile_pic: require('../../assets/images/avatar-1.png'),
            name: 'Pradeep'
        }
    ]
    useEffect(() => {

    }, []);

    return (
        <View style={styles.popularContainer}>
            <Text style={styles.textTitle}>POPULAR</Text>
            <ScrollView horizontal={true}>
                <View style={styles.popularImageContainer}>

                    {
                        this.state.map((item, index) => {
                            return <View style={styles.item} key={index} ><AvatarComponent size={52} url={item.profile_pic}></AvatarComponent></View>
                        })
                    }
                </View>
            </ScrollView>
        </View>
    );
};

export default PopularComponent;

const styles = StyleSheet.create({
    popularContainer: {
        height: 125,
        paddingTop: 20,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: Color.LIGHT_GREEN
    },
    popularImageContainer: {
        paddingTop: 15,
        paddingBottom: 20,
        paddingLeft: 20,
        display: 'flex',
        flexDirection: 'row'        
    },
    textTitle: {
        paddingLeft: 20,
        fontWeight: '500',
        color: Color.PRIMARY_COLOR
    },
    item: {
        marginRight: 18,
        shadowColor: "rgba(0,0,0, 0.20)",
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 1,
		shadowRadius: 15,
		elevation: 10,
    }
})
