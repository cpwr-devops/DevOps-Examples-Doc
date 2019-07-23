module.exports = {
    title: "Mainframe DevOps",
    //description: "Mainframe DevOps",
    ga: 'UA-139353569-1',
    themeConfig: {
        logo: 'compuware_logo.png',
        //displayAllHeaders: true,
        sidebarDepth: 2,
        nav: [
        { text: 'Pipelines',
        items: [
            { text: 'Getting started',
            link: '/pipelines/'
            },
            { text: 'Basic Pipeline Example',
            link: '/pipelines/Mainframe-CI-Example-pipeline'
            },
            { text: 'Groovy Tips',
            link: '/pipelines/Jenkins_Groovy'
            },
            { text: '----------------------',
              link: ''
            },
            { text: 'Shared Library Example',
              link: '/shared_library/Mainframe_CI_Pipeline_from_Shared_Lib'
            }
          ]
        },
        { text: 'Scenarios',
        items: [
            { text: 'Basic Scenario',
            link: '/pipeline_scenario/'
            },
            { text: 'Elaborate Scenarios',
            link: '/pipeline_scenario/Elaborate_scenario'
            },
            { text: 'ISPW Setup',
            link: '/pipeline_scenario/ISPW_setup'
            },
            { text: 'Unit Test Setup',
            link: '/pipeline_scenario/TTT_scenario'
            },
            { text: 'Functional Test Setup',
            link: '/pipeline_scenario/TTT_FT_scenario'
            },
            { text: 'Advanced Scenarios',
            link: '/pipeline_scenario/push_ttt_results_to_git'
            },            
          ]
        },
        { text: 'Configuration',
        items: [
            {
              text: 'Introduction to Jenkins Plugins',
              link: '/tool_configuration/plugins'
            },
            { text: 'Jenkins Configuration',
              link: '/tool_configuration/Jenkins_config'
            },
            { text: 'Using Jenkins Plugins',
              link: '/tool_configuration/jenkins_usage'
            },
            { text: 'Tool Configurations',
              link: '/tool_configuration/'
            },
            { text: 'CES Webhook Configuration',
              link: '/tool_configuration/webhook_setup'
            },
            { text: 'CES Access Token Configuration',
              link: '/tool_configuration/CES_credentials_token'
            }
          ] 
        },
        { text: 'APIs',
        items: [
          {
          text: 'Rest API',
          link: '/code_examples/Rest_api'
          },
          { text: 'Topaz CLI',
            link: '/code_examples/Topaz_cli'
          },
          { text: 'Topaz Workbench SDK',
          link: '/code_examples/Topaz_Workbench_SDK'
          },
          { text: 'Topaz Java API',
            link: '/code_examples/Topaz_API'
          },
          { text: 'Developing a Topaz Workbench PassTicket Extension',
          link: '/code_examples/Passticket'
          }
        ] 
      }
    ],
        sidebar: {
            '/pipelines/': [
              '',  
              'Mainframe-CI-Example-pipeline',
              'Jenkins_Groovy'
            ],
            '/pipeline_scenario/': [ 
              '',
              'Elaborate_scenario',
              'ISPW_setup',
              'TTT_scenario',
              'TTT_FT_scenario',
              'push_ttt_results_to_git'              
            ],            
            '/shared_library/': [ 
              'Mainframe_CI_Pipeline_from_Shared_Lib',
              'config_files',
              'helper_classes/'
            ],
            '/tool_configuration/': [
              'plugins',
              'Jenkins_config',
              'jenkins_usage',
              '',      //configurations
              'webhook_setup',
              'CES_credentials_token'
            ],
            '/code_examples/': [
                'Rest_api',
                'Topaz_cli',
                'Topaz_Workbench_SDK',
                'Topaz_API',
                'Topaz_Workbench_API_Code_snippets',
                'Passticket'
            ]
          }
    }
  }
