const logger = require('../support/logger').withIdentifier('teamService');
const StudentsView = require('./../data/viewModels/teamsView');
const _ = require('lodash');

const TEAM_MODEL_ATTRIBUTES = ['id', 'displayName', 'summary', 'slackChannel', 'distributionList', 'status', 'createdAt', 'updatedAt'];

class StudentsService {
  constructor(data, memberService) {
    this.dataStore = data;
    this.memberService = memberService;
  }

  async getTeamsBySearchTerm(searchTerm, size, offset) {
    logger.info(`getTeamsBySearchTerm - searchTerm=${searchTerm} size=${size} offset=${offset}`);
    try {
      const [exactMatchDisplayNameRes, fullWordMatchDisplayNameRes, fullWordMatchSummaryRes, fullWordMatchDetailsRes, fuzzyMatchRes] = await Promise.all([
        this.findAllTeams({ displayName: `${searchTerm}` }),
        this.findAllTeams({ displayName: { [Op.regexp]: `\b${searchTerm}\b` } }, [['displayName', 'ASC']]), // complete word match
        this.findAllTeams({ summary: { [Op.regexp]: `\b${searchTerm}\b` } }),
        this.findAllTeams({ details: { [Op.regexp]: `\b${searchTerm}\b` } }),
        this.findAllTeams({
          [Op.or]: [
            { displayName: { [Op.like]: `%${searchTerm}%` } },
            { summary: { [Op.like]: `%${searchTerm}%` } },
            { details: { [Op.like]: `%${searchTerm}%` } },
            { slackChannel: { [Op.like]: `%${searchTerm}%` } },
            { distributionList: { [Op.like]: `%${searchTerm}%` } },
            { name: { [Op.like]: `%${searchTerm}%` } },
          ],
        }),
      ]);
      logger.info(`Successfully retrieving teams by searchTerm from db searchTerm=${searchTerm}`);
      const allResults = _.uniqBy([...exactMatchDisplayNameRes, ...fullWordMatchDisplayNameRes, ...fullWordMatchSummaryRes, ...fullWordMatchDetailsRes, ...fuzzyMatchRes], 'id');
      const count = allResults.length;
      const finalResults = allResults.slice(size * offset, (((size * offset) + size)));
      return { teams: finalResults, count };
    } catch (error) {
      logger.error(`Error retrieving teams by searchTerm from db searchTerm=${searchTerm} error=${error}`);
      throw error;
    }
  }

  async getStudentById(resourceId, size, offset) {
    logger.info(`getTeamsByResourceId - resourceId=${resourceId} size=${size} offset=${offset}`);
    try {
      return { teams: finalResults, count };
    } catch (error) {
      logger.error(`Error retrieving teams by resource id error=${error}`);
      throw error;
    }
  }

  async getAllStudents() {
    logger.info(`getAllTeams - size=${size} offset=${offset}`);
    try {
      return {};
    } catch (error) {
      logger.error(`Error retrieving all teams error=${error}`);
      throw error;
    }
  }

}

module.exports = StudentsService;
