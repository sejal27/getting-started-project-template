exports.main = async (context = {}, sendResponse) => {
  
  // Store contact firstname, configured as propertiesToSend in crm-card.json
  const { firstname } = context.propertiesToSend;

  // Make a all to ZenQuotes public API and fetch data

  try {
    const { quotesData } = await axios.get("https://zenquotes.io/api/random");
    const quoteSections = [
      {
        "type": "tile",
        "body": [
          {
            "type": "text",
            "format": "markdown",
            "text": "**Hello " + firstname + ", Here's your quote for the day**!"
          },
          {
            "type": "text",
            "format": "markdown",
            "text": "**Quote**:" + quotesData[0].q
          },
          {
            "type": "text",
            "format": "markdown",
            "text": "**Author**:" + quotesData[0].a
          }
        ]
      },
      {
        "type": "button",
        "text": "Get new quote",
        "onClick": {
          "type": "SERVERLESS_ACTION_HOOK",
          "serverlessFunction": "crm-card"
        }
      }
    ];
    return quoteSections;
  } catch (error) {
    const quoteSections = [
      {
        "type": "alert",
        "variant": "error"
        "title": "Error fetching new quote",
        "body": {
          "type": "text",
          "text": error.message
        }
      }
    ];
    return quoteSections;
  }
  
  const introMessage = [
    {
      type: "text",
      text: "An example of a CRM card extension that displays data from Hubspot, uses ZenQuotes public API to display daily quote, and demonstrates custom actions using serverless functions.",
    },
    {
      type: "divider",
      distance: "small",
    }
  ];

  const sections = [...introMessage, ...quoteSections];

  sendResponse({
    sections,
  });
};

  

  
    


