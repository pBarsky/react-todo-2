import { createContext, useContext, useEffect, useState } from 'react'

import { v1 as uuid } from 'uuid'
import { database } from '../firebase'
import { useAuth } from './authContext'

const DbContext = createContext(null)

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
    if (!db) return null
    const res = await db.get()
    return res.val()
  }

  /**
   * Upload a user task to db
   * @param {Task} data - a task to upload
   * @returns {string | null} returns task id
   */
  const createAsync = async (data) => {
    if (!db) return uuid()
    const res = await db.push(data)
    return res.path.pieces_[res.path.pieces_.length - 1]
  }
  /**
   *
   * @param {string} key - task id
   * @param {Todo} data - task data
   */
  const updateAsync = async (key, data) => {
    if (!db) return
    console.log(key, data)
    await db.child(key).update(data)
  }

  /**
   *
   * @param {string} key - task id
   */
  const removeAsync = async (key) => {
    if (!db) return
    await db.child(key).remove()
  }

  const removeAllAsync = async () => {
    if (!db) return true
    await db.remove()
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
