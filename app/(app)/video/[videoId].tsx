import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { useVideoDetails } from '@/hooks/useVideoDetails'
import PersonIcon from '@/assets/icons/person-icon.svg'
import ViewsIcon from '@/assets/icons/views-icon.svg'
import LikesIcon from '@/assets/icons/likes-icon.svg'
import YouTubeVideoPlayer from '@/components/YouTubeVideoPlayer'
import { VideoDetailItem } from '@/api/youtube/types'
import TabComponent from '@/components/TabComponent'
import { useAppStore } from '@/store/useAppStore'
import PrimaryButton from '@/components/PrimaryButton'
import { formatTime } from '@/utils/videoUtils'
import { useVideoPlayer } from '@/hooks/useVideoPlayer'

const DetailsTab = ({ data }: { data: VideoDetailItem }) => {
  return (
    <ScrollView style={styles.infoContainer}>
      <Text style={styles.title}>{data?.snippet.title}</Text>
      <View style={styles.authorContainer}>
        <PersonIcon />
        <Text style={styles.channelName}>{data?.snippet.channelTitle}</Text>
      </View>
      <Text style={styles.sectionHeader}>Description</Text>
      <Text style={styles.description}>{data?.snippet.description}</Text>
      <Text style={styles.sectionHeader}>Statistics</Text>
      <View style={styles.statsContainerWrapper}>
        <View style={styles.statsContainer}>
          <ViewsIcon width={20} height={20} fill='none' stroke='white' />
          <Text style={styles.statsValue}>
            {data?.statistics.viewCount} views
          </Text>
        </View>
        <View style={styles.statsContainer}>
          <LikesIcon width={20} height={20} />
          <Text style={styles.statsValue}>
            {data?.statistics.likeCount} likes
          </Text>
        </View>
      </View>
    </ScrollView>
  )
}

const NotesTab = ({ data }: { data: VideoDetailItem }) => {
  const notes = useAppStore((state) => state.notes)
  const addNote = useAppStore((state) => state.addNote)
  const deleteNote = useAppStore((state) => state.deleteNote)
  const [note, setNote] = useState<string>('')
  const { currentTime } = useVideoPlayer()

  // Filter notes for this video
  const videoNotes = Array.isArray(notes)
    ? notes.filter((note) => note.videoId === data.id)
    : []

  const handleSaveNote = () => {
    if (note.trim()) {
      addNote(data.id, note.trim(), currentTime)
      setNote('')
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.notesContainer}>
        <ScrollView style={styles.notesList}>
          {videoNotes && videoNotes.length > 0 ? (
            videoNotes.map((note) => (
              <View key={note.id} style={styles.noteItem}>
                <Text style={styles.noteText}>{note.text}</Text>
                <Text style={styles.noteTimestamp}>
                  {formatTime(note.timestamp)}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.noNotesText}>
              No notes yet. Add your first note!
            </Text>
          )}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.noteInput}
            placeholder='Add a note'
            value={note}
            onChangeText={setNote}
            onSubmitEditing={handleSaveNote}
            numberOfLines={3}
            multiline={true}
            placeholderTextColor='#999999'
          />
          <PrimaryButton
            title='Save Note'
            onPress={handleSaveNote}
            style={styles.saveButton}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}
const VideoDetails = () => {
  const { videoId } = useLocalSearchParams<{ videoId: string }>()
  const { data, isLoading, isError } = useVideoDetails(videoId)

  const tabs = [
    {
      name: 'Details',
      component: <DetailsTab data={data as VideoDetailItem} />,
    },
    {
      name: 'Notes',
      component: <NotesTab data={data as VideoDetailItem} />,
    },
  ]

  return (
    <View style={styles.container}>
      <YouTubeVideoPlayer />
      <TabComponent tabs={tabs} />
    </View>
  )
}

export default VideoDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    color: '#2B2D42',
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 16,
  },
  channelName: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 14,
    color: '#2B2D42',
  },
  infoContainer: {
    padding: 20,
  },
  statsContainerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statsContainer: {
    backgroundColor: 'pink',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 32,
    borderRadius: 8,
    paddingHorizontal: 12,
    width: 150,
  },
  sectionHeader: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 10,
    marginTop: 16,
    marginBottom: 8,
  },
  description: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: '#2B2D42',
  },
  statsValue: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 10,
    color: 'white',
  },
  notesContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  inputContainer: {
    paddingVertical: 16,
    gap: 12,
  },
  noteInput: {
    borderWidth: 1,
    borderRadius: 12,
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    borderColor: '#C8C8C8',
    paddingHorizontal: 12,
    paddingVertical: 8,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  saveButton: {
    width: '100%',
  },
  notesList: {
    flex: 1,
    paddingVertical: 16,
  },
  noNotesText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#999999',
    textAlign: 'center',
    marginTop: 40,
  },
  noteItem: {
    borderWidth: 1,
    borderColor: '#C8C8C8',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    backgroundColor: '#F8F8F8',
  },
  noteText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#2B2D42',
    marginBottom: 4,
  },
  noteTimestamp: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 12,
    color: '#666666',
    textAlign: 'right',
  },
})
