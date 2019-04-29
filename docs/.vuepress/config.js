module.exports = {
    title: "Mainframe DevOps",
    //description: "Mainframe DevOps",
    themeConfig: {
        logo: '/compuware.png',
        //displayAllHeaders: true,
        nav: [
        { text: 'Pipelines',
        items: [
            { text: 'Pipeline Scenarios',
              link: '/pipeline_scenario/pipelines'
            },
            {   text: 'Basic Pipelines Example',
                link: '/pipelines/'
            },
            { text: 'Shared Library Example',
              link: '/shared_library/Mainframe_CI_Pipeline_from_Shared_Lib'
            }
          ]
        },
        { text: 'Configuration',
          items: [{
              text: 'Plugins',
              link: '/tool_configuration/plugins'
            },
            { text: 'CES Webhook Configuration',
              link: '/tool_configuration/webhook_setup'
            },
            { text: 'CES Access Token Configuration',
              link: '/tool_configuration/CES_credentials_token'
            },
            { text: 'Jenkins Configuration',
              link: '/tool_configuration/Jenkins_config'
            }
          ] 
        },
        { text: 'APIs',
        items: [{
          text: 'Rest API',
          link: '/code_examples/Rest_api'
        },
        { text: 'Topaz CLI',
          link: '/code_examples/Topaz_cli'
        },
        { text: 'Topaz Workbench SDK',
          link: '/code_examples/Topaz_Workbench_SDK'
        }
      ] 
    }
  ],
        sidebar: {
            '/pipelines/': [
              '',  
              'Mainframe-CI-Example-pipeline',
              'Push_TTT_results_to_Git', 
              'Jenkins_Groovy'
            ],
            '/pipeline_scenario/': [ 
              'pipelines',
              '',
              'TTT_scenario'
            ],            
            '/shared_library/': [ 
              'Mainframe_CI_Pipeline_from_Shared_Lib',
              'pipeline_parameters',
              'config_files',
              'helper_classes/'
            ],
            '/tool_configuration/': [
              'plugins', 
              '',      //configurations
              'webhook_setup',
              'CES_credentials_token',
              'Jenkins_config'
            ],
            '/code_examples/': [
                'Rest_api',
                'Topaz_cli',
                'Topaz_Workbench_SDK',
                'Passticket',
                'Topaz_Workbench_API_Code_snippets'
            ]            
          }
    }
  }
