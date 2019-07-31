module.exports = {
  title: "Mainframe DevOps",
  //description: "Mainframe DevOps",
  ga: 'UA-139353569-1',
  themeConfig: {
    logo: 'compuware_logo.png',
    //displayAllHeaders: true,
    sidebarDepth: 1,
    nav: 
    [
      { 
        text: 'Pipelines',
        items: 
        [
          { 
            text: 'Getting Started',
            items: 
            [
              { 
                text: 'Getting started',
                link: '/pipelines/'
              },
              { 
                text: 'Basic Pipeline Scenario',
                link: '/pipelines/basic_scenario'
              },
              { 
                text: 'Basic Pipeline Example',
                link: '/pipelines/basic_example_pipeline'
              }
            ]
          },
          { 
            text: 'Pipeline Snippets',
            items: 
            [
              { 
                text: 'All Snippets',
                link: '/pipeline_snippets/'
              },
              { 
                text: 'Pushing test results to GitHub',
                link: '/pipeline_snippets/push_ttt_results_to_git'
              }
            ]
          },
          { 
            text: 'Advanced Pipelines',
            items: 
            [
              { 
                text: 'Elaborate Scenario',
                link: '/advanced_pipelines/elaborate_scenario'
              },
              { 
                text: 'Shared Library Examples',
                link: '/advanced_pipelines/'
              }
            ]
          }
        ]
      },
      { 
        text: 'Configuration',
        items: 
        [
          {
            text: 'Jenkins',
            items:
            [
              { 
                text: 'Introduction to Jenkins Plugins',
                link: '/tool_configuration/plugins'
              },
              { 
                text: 'Jenkins Configuration',
                link: '/tool_configuration/Jenkins_config'
              },
              { 
                text: 'Using Jenkins Plugins',
                link: '/tool_configuration/jenkins_usage'
              },
              { 
                text: 'Tool Configurations',
                link: '/tool_configuration/'
              }
            ]
          },
          { 
            text: 'Compuware',
            items:
            [
              { 
                text: 'CES Webhook Configuration',
                link: '/tool_configuration/webhook_setup'
              },
              { 
                text: 'CES Access Token Configuration',
                link: '/tool_configuration/CES_credentials_token'
              }
            ]
          }
        ] 
      },
      { 
        text: 'Guidelines',
        items: 
        [
          { 
            text: 'ISPW Setup',
            link: '/guidelines/ispw_setup'
          },
          { 
            text: 'Unit Test Setup',
            link: '/guidelines/ttt_scenario'
          },
          { 
            text: 'Functional Test Setup',
            link: '/guidelines/ttt_ft_scenario'
          },
          { 
            text: 'SonarLint and ISPW',
            link: '/guidelines/ispw_projects' 
          },
          { 
            text: 'Groovy Tipps',
            link: '/guidelines/jenkins_groovy' 
          }
        ]
      },  
      { 
        text: 'APIs',
        items: 
        [
          {
            text: 'APIs',
            items: 
            [
              {
                text: 'Rest API',
                link: '/apis/rest_api'
              },
              { 
                text: 'Topaz CLI',
                link: '/apis/topaz_cli'
              },
              { 
                text: 'Topaz Workbench SDK',
                link: '/apis/topaz_workbench_sdk'
              },
              { 
                text: 'Topaz Java API',
                link: '/apis/topaz_api'
              },
            ]
          },
          {
            text: 'Use cases',
            items: [
              { 
                text: 'Developing a Topaz Workbench Passticket Extension',            
                link: '/apis/passticket'
              }
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