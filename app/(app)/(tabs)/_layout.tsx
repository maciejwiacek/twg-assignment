import React from 'react'
import { Tabs } from 'expo-router'
import Home from '@/assets/icons/home-icon.svg'
import Search from '@/assets/icons/search-icon.svg'

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#2B2D42',
        tabBarInactiveTintColor: 'white',
        tabBarStyle: {
          backgroundColor: '#8D99AE',
        },
      }}
    >
      <Tabs.Screen
        name='home'
        options={{
          headerShown: false,
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Home width={24} height={24} stroke={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='search'
        options={{
          headerShown: false,
          title: 'Search',
          tabBarIcon: ({ color }) => (
            <Search width={24} height={24} stroke={color} />
          ),
        }}
        initialParams={{
          initialSearchText: '',
        }}
      />
    </Tabs>
  )
}

export default Layout
