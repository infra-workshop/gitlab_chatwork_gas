let CHATWORK_API_KEY = "";
let CHATWORK_ROOM_ID = "";
let ChatWorkClient;

/* eslint-disable no-unused-vars */
/**
 * Set ChatWork API key.
 *
 * @param {string} key - API key
 */
function setChatworkAPIKey(key: string): void {
  /* eslint-enable no-unused-vars */
  CHATWORK_API_KEY = key;
}

/* eslint-disable no-unused-vars */
/**
 * Set ChatWork Room ID.
 *
 * @param {string} id - Room ID
 */
function setChatworkRoomId(id: string): void {
  /* eslint-enable no-unused-vars */
  CHATWORK_ROOM_ID = id;
}

/* eslint-disable no-unused-vars */
/**
 * Set ChatWork client.
 *
 * @param {any} client - ChatWork client.
 */
function setChatWorkClient(client: any): void {
  /* eslint-enable no-unused-vars */
  ChatWorkClient = client;
}

/* eslint-disable no-unused-vars */
/**
 * Send message to ChatWork room.
 *
 * @param {string} message - Message to send.
 */
function sendMessageToChatwork(message: string): void {
  /* eslint-enable no-unused-vars */
  const client = ChatWorkClient.factory({ token: CHATWORK_API_KEY });
  client.sendMessage({ room_id: CHATWORK_ROOM_ID, body: message });
}

/* eslint-disable no-unused-vars */
/**
 * Construct message fron POST data.
 *
 * @param {Object} data - POST data.
 * @return {string}
 */
function constructChatworkMessageFromGitLab(data: Object): string {
  /* eslint-enable no-unused-vars */
  const title =
    data["object_attributes"]["url"] + " is updated by " + data["user"]["name"];
  let message = "";
  switch (true) {
    case data["object_kind"] == "wiki_page":
      message = constructChatworkMessageFromGitLabWiki(data);
      break;
    case data["object_kind"] == "note":
      message = constructChatworkMessageFromGitLabNote(data);
      break;
    case data["object_kind"] == "issue":
      message = constructChatworkMessageFromGitLabIssue(data);
      break;
    default:
      message = "not implemented" + JSON.stringify(data);
      break;
  }
  return "[info][title]" + title + "[/title]" + message + "[/info]";
}

/**
 * Construct message when the post is from wiki.
 *
 * @param {Object} data - POST data.
 * @return {string}
 */
function constructChatworkMessageFromGitLabWiki(data): string {
  return data["object_attributes"]["content"];
}

/**
 * Construct message when the post is from note.
 *
 * @param {Object} data - POST data.
 * @return {string}
 */
function constructChatworkMessageFromGitLabNote(data): string {
  if ("issue" in data) {
    if ("changed the description" == data["object_attributes"]["description"]) {
      return (
        data["object_attributes"]["description"] +
        "\n" +
        data["issue"]["description"]
      );
    }
    return data["object_attributes"]["description"];
  }
  return data["object_attributes"]["note"];
}

/**
 * Construct message when the post is from issue.
 *
 * @param {Object} data - POST data.
 * @return {string}
 */
function constructChatworkMessageFromGitLabIssue(data): string {
  return data["object_attributes"]["description"];
}
