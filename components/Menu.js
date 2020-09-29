import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Alert} from 'react-native';
import Logo from './Logo';
import EmailAndPassword from './EmailAndPassword';
import LinearGradient from 'react-native-linear-gradient';

export default class Menu extends Component {

    doc = [
        {
          name: 'Breakfast',
          color: ['#FBB034', '#F9D976'],
          recipes: [
            {
              name: 'Sweet yoghurt',
              image_url: require('../assets/sweet.jpg'),
              calories: '172kcal',
              description: '',
            },
            {
              name: 'Healthy Fresh',
              image_url: require('../assets/smoothie.jpg'),
              calories: '109kcal',
              description: '',
            },
          ],
        },
        {
            name: 'Lunch',
            color: ['#FF416C', '#e65c00'],
            recipes: [
              {
                name: 'Ratatouille, vegetable side dish',
                image_url: require('../assets/Ratatouille.jpg'),
                calories: '106kcal',
                description: '',
              },
              {
                name: 'Apple and Celery Fresh',
                image_url: require('../assets/appleCelery.jpg'),
                calories: '227kcal',
                description: '',
              },
            ],
          },
          {
            name: 'Snack',
            color: ['#fc00ff', '#00dbde'],
            recipes: [
              {
                name: 'Peanut',
                image_url: require('../assets/peanut.jpg'),
                calories: '272kcal',
                description: '',
              },
              {
                name: 'Fried eggs with greens',
                image_url: require('../assets/egg.jpg'),
                calories: '110kcal',
                description: '',
              },
              {
                  name: 'Yogurt with strawberries',
                  image_url: require('../assets/yogurtAndStrawberries.jpg'),
                  calories: '106kcal',
                  description: '',
                },
                {
                  name: 'Drinking Water',
                  image_url: require('../assets/water.jpg'),
                  calories: '0 kcal',
                  description: '10KCAL',
                },
            ],
          },
          {
            name: 'Dinner',
            color: ['#B24592', '#e35d5b'],
            recipes: [
              {
                name: 'appleJuice',
                image_url: require('../assets/peanut.jpg'),
                calories: '20Kcal',
                description: '',
              },
            ],
          },
          {
            name: 'Supper',
            color: ['#348F50', '#56B4D3'],
            recipes: [
              {
                name: 'Cooked quiona',
                image_url: require('../assets/quiona.jpg'),
                calories: '250Kcal',
                description: '',
              },
              {
                name: 'Fresh mulberry',
                image_url: require('../assets/mulberry.jpg'),
                calories: '19kcal',
                description: '',
              },
              {
                  name: 'Drinking water',
                  image_url: require('../assets/water.jpg'),
                  calories: '0kcal',
                  description: '',
                },
            ],
          },
      ];

  constructor(props) {
      super(props);
    
  }

  showRecipe(recipe){
 this.props.navigation.navigate("Recipe", {name: "test"})
  }

  renderFlatList({item}) {
    return (
      <View style={styles.card}>
        <LinearGradient colors={item.color} style={styles.linearGradient}>
          <View style={styles.header}>
            <Text style={styles.headerText}>{item.name}</Text>
          </View>
        </LinearGradient>
        {item.recipes.map((recipe) => {
          return (
            <TouchableOpacity
              style={{padding: 10, borderBottomColor: "grey", borderBottomWidth: 1}}
              onPress={() => {this.showRecipe(recipe)}}>

              <View style={styles.data}>
                <View style={styles.foodImage}>
                  <Image
                    source={recipe.image_url}
                    style={{
                      height: 65,
                      width: 65,
                      borderRadius: 30,
                      // margin: 10
                    }}></Image>
                </View>

                <View style={styles.foodDescription}>
                  <Text style={{color: 'black', fontSize: 20, marginBottom: 10}}>
                    {recipe.name}
                  </Text>
                  <Text style={{color: '#19F120', fontSize: 16}}>
                    {recipe.calories}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
            vertical
            data={this.doc}
            renderItem={e => this.renderFlatList(e)}
            keyExtractor={(item, index) => {
            return index;
            }}
            scrollEnabled={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //s justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emailAndPassword: {
    flex: 2,
  },
  linearGradient: {
    // flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  header: {
    height: 50,
    width: 380,
    // alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 18,
  },
  data: {
    flexDirection: 'row',
  },
  foodImage: {
    height: 65,
    width: 65,
    marginRight: 20
  },
  foodDescription: {
    justifyContent: 'center',
  },
  card: {
      backgroundColor: "white",
    minHeight: 135,
    width: 380,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 2.22,
    elevation: 3,
  },
});
