import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },

  title: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 20,
    color: '#000',
  },

  list: {
    gap: 12,
  },

  item: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },

  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },

  ownerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  ownerName: {
    color: '#333',
    fontSize: 16,
  },

  repoOwner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  repoStars: {
    color: '#333',
    fontSize: 14,
  },

  repoName: {
    color: '#000',
    fontSize: 18,
  },

  repoDescription: {
    color: '#666',
    fontSize: 14,
    marginTop: 5,
  },
});