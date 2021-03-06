const matchService = require('../services/matchService')
const chatDelegate = require('../delegates/chatDelegate')

const createMatch = async ({ tourist, guide }) => {
  try {

    const match = await matchService.getActiveMatchByUserIds({ tourist, guide })

    if (match) {
      return match
    } else {
    const { id: chatId } = await chatDelegate.createChat({ tourist, guide })
    return matchService.createMatch({ tourist, guide, chatId })
    }
  } catch (error) {
    console.error(`Error creating chat or match`)
  }
}

const getMatchByUserIds = async ({ tourist, guide }) => {
  return matchService.getMatchByUserIds({ tourist, guide })
}

const getMatch = async id => {
  return matchService.getMatch(id)
}

const getMatchesByUser = async userId => {
  return matchService.getMatchesByUser(userId)
}

const getMatchByChatId = async chatId => {
  return matchService.getMatchByChatId(chatId)
}

const updateMatch = async (chatId, status) => {
  return matchService.updateMatch(chatId, status)
}

module.exports = {
  createMatch,
  getMatchByUserIds,
  getMatch,
  getMatchesByUser,
  getMatchByChatId,
  updateMatch,
}
