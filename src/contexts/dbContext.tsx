import React, { createContext, useContext, useEffect, useState } from 'react'

import { v1 as uuid } from 'uuid'
import firebase, { database } from '../firebase'
import { Todo } from '../models/todo'
import { useAuth } from './authContext'

interface dbContextState {
  getAllAsync: () => Promise<Record<string, Todo> | null>;
  createAsync: (data: Todo) => Promise<string>;
  updateAsync: (key: string, data: Todo) => Promise<void>;
  removeAsync: (key: string) => Promise<void>;
  removeAllAsync: () => Promise<void>
}

const initialState = {
  createAsync (data: Todo): Promise<string> {
    return Promise.resolve('')
  },
  getAllAsync (): Promise<Record<string, Todo> | null> {
    return Promise.resolve(null)
  },
  removeAllAsync (): Promise<void> {
    return Promise.resolve(undefined)
  },
  removeAsync (key: string): Promise<void> {
    return Promise.resolve(undefined)
  },
  updateAsync (key: string, data: Todo): Promise<void> {
    return Promise.resolve(undefined)
  }
}

const DbContext = createContext<dbContextState>(initialState)

interface Props {
  children: React.ReactElement
}

export const DbProvider = ({ children }: Props) => {
  const [db, setDb] = useState<firebase.database.Reference | null>(null)
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
   * @returns User tasks or null
   */
  const getAllAsync = async (): Promise<Record<string, Todo> | null> => {
    // TODO: add offset and limit
    if (!db) return null
    const res = await db.get()
    return res.val() as Record<string, Todo>
  }

  /**
   * Upload a user task to db
   * @param {Task} data - a task to upload
   * @returns {string} returns task id
   */
  const createAsync = async (data: Todo): Promise<string> => {
    if (!db) return uuid()
    const res = await db.push(data)
    return res.key ?? uuid()
    // return res.path.pieces_[res.path.pieces_.length - 1]
  }
  /**
   *
   * @param {string} key - task id
   * @param {Todo} data - task data
   */
  const updateAsync = async (key: string, data: Todo): Promise<void> => {
    if (!db) return
    await db.child(key).update(data)
  }

  /**
   *
   * @param {string} key - task id
   */
  const removeAsync = async (key: string): Promise<void> => {
    if (!db) return
    await db.child(key).remove()
  }

  const removeAllAsync = async (): Promise<void> => {
    if (!db) return
    await db.remove()
  }

  const value: dbContextState = {
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
