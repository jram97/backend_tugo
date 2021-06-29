export const success = (res, status) => (entity) => {
  if (entity) {
    res.status(status || 200).json(entity)
  }
  return null
}

export const notFound = (res) => (entity) => {
  if (entity) {
    return entity
  }
  res.status(404).end()
  return null
}

export const authorOrAdmin = (res, user, userField) => (entity) => {
  if (entity) {
    let isAuthor

    const isAdmin = user.role === 'admin'
    if (Array.isArray(entity[userField])) {
      isAuthor = entity[userField] && entity[userField][0].id.equals(user.id)
    } else {
      isAuthor = entity[userField] && entity[userField].equals(user.id)
    }
    // isAuthor = entity[userField] && entity[userField][0].id === user.id
    if (isAuthor || isAdmin) {
      return entity
    }
    res.status(401).end()
  }
  return null
}
