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
            { text: 'Pipeline Scenarios',
              link: '/pipeline_scenario/pipelines'
            },
            { text: 'Shared Library Example',
              link: '/shared_library/Mainframe_CI_Pipeline_from_Shared_Lib'
            }
          ]
        },
        { text: 'Configuration',
          items: [{
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
        items: [{
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
              'push_ttt_results_to_git', 
              'Jenkins_Groovy'
            ],
            '/pipeline_scenario/': [ 
              'pipelines',
              '',
              'TTT_scenario',
              'TTT_FT_scenario'
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
        ] 
      }
    ],
    sidebar: {
      '/pipelines/': [
        '',  
        'basic_scenario',
        'basic_example_pipeline'
      ],
      '/guidelines/': [ 
        'ispw_setup',
        'ttt_scenario',
        'ttt_ft_scenario',
        'ispw_projects',
        'jenkins_groovy'
      ],            
      '/advanced_pipelines/': [ 
        '',
        'setup',
        'steps',
        'config_files',
        'parameters',
        'elaborate_scenario',        
        'helper_classes/'
      ],
      '/pipeline_snippets/': [ 
        '',
        'push_ttt_results_to_git'
      ],
      '/tool_configuration/': [
        'plugins',
        'Jenkins_config',
        'jenkins_usage',
        '',      //configurations
        'webhook_setup',
        'CES_credentials_token'
      ],
      '/apis/': [
          'rest_api',
          'topaz_cli',
          'topaz_workbench_sdk',
          'topaz_api',
          'topaz_workbench_api_code_snippets',
          'passticket'
      ]
    }
  }
}