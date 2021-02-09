import { useEffect, createContext, useContext, useState } from 'react'

import { database } from '../firebase'
import { useAuth } from './authContext'

const DbContext = createContext()

export const DbProvider = ({ children }) => {
  const [db, setDb] = useState(null)
  const [loading, setLoading] = useState(true)
  const { currentUser } = useAuth()

  useEffect(() => {
    setLoading(true)
    if (currentUser) {
      setDb(database.ref(`/userData/${currentUser.uid}`))
    }
    setLoading(false)
  }, [currentUser])

  /**
   * Get all tasks of user
   * @async getAllAsync
   * @param {number} limit - limit of tasks to get
   * @param {string} last - id of last task // works as offset
   * @returns User tasks or null
   */
  const getAllAsync = async (limit = 15, last = null) => {
    // TODO: add offset and limit
    try {
      const res = await db.get()
      return res.val()
    } catch {
      return null
    }
  }

  /**
   * Upload a user task to db
   * @param {Task} data - a task to upload
   * @returns {string | null} returns task id
   */
  const createAsync = async (data) => {
    if (!db) return null
    try {
      const res = await db.push(data)
      return res.path.pieces_[res.path.pieces_.length - 1]
    } catch (e) {
      return null
    }
  }
  /**
   *
   * @param {string} key - task id
   * @param {Todo} data - task data
   */
  const updateAsync = async (key, data) => {
    if (!db) return false
    try {
      await db.child(key).update(data)
    } catch {
      return false
    } return true
  }

  /**
   *
   * @param {string} key - task id
   */
  const removeAsync = async (key) => {
    if (!db) return false
    try {
      await db.child(key).remove()
    } catch {
      return false
    }
    return true
  }

  const removeAllAsync = async () => {
    if (!db) return false
    try {
      await db.remove()
    } catch {
      return false
    }
    return true
  }

  const value = {
    getAllAsync,
    createAsync,
    updateAsync,
    removeAsync,
    removeAllAsync
  }
  return (
    <DbContext.Provider value={value}>
      {!loading && children}
    </DbContext.Provider>
  )
}

export const useDb = () => useContext(DbContext)
