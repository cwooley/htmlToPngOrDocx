const Mocha = require("mocha");
const expect = require("chai").expect;
const axios = require("axios");
const mocha = new Mocha();
const baseAPI = "http://localsso.cpm.org:3005/api";


axios.defaults.origin = 'http://localsso.cpm.org:3005';

const authenticate_against_sso = () => {


	return axios.post(CPM_SSO_URL + "/authenticate?api=true", {
		username: CPM_SSO_TEST_USER,
		password: CPM_SSO_TEST_USER_PASSWORD
	})
		.catch((error)=>{
			console.log("Got error", error);
			return Promise.reject(error);
		})
};



describe("teacher tests", function(){

	before((done)=>{
		try {
			console.log('STARTING TESTS');
			require("../src/server.ts").then(({server: s}) => {
				server = s;
				done();
			});
		} catch (e) {
			console.log('Error starting test!!', e);
			done();
		}
	});

	after((done) => {
		console.log("Exiting tests!");

		if(server)
			server.close(done);

		setTimeout(()=>{
			process.exit(0);
		},1000)

	});
	
	describe("Review Apps", ()=>{
		const SAMPLE_WEBHOOK_BODY = {
			"pullrequest": {
				"rendered": {
					"description": {
						"raw": "",
						"markup": "markdown",
						"html": "",
						"type": "rendered"
					},
					"title": {
						"raw": "CPM-1745 review apps",
						"markup": "markdown",
						"html": "<pre class=\"plaintext\">CPM-1745 review apps</pre>",
						"type": "rendered"
					}
				},
				"type": "pullrequest",
				"description": "",
				"links": {
					"decline": {
						"href": "https://api.bitbucket.org/2.0/repositories/cpmdev/c3po-editor-ui/pullrequests/149/decline"
					},
					"diffstat": {
						"href": "https://api.bitbucket.org/2.0/repositories/cpmdev/c3po-editor-ui/diffstat/cpmdev/c3po-editor-ui:2e5429d76afa%0D4e306e2a28f9?from_pullrequest_id=149"
					},
					"commits": {
						"href": "https://api.bitbucket.org/2.0/repositories/cpmdev/c3po-editor-ui/pullrequests/149/commits"
					},
					"self": {
						"href": "https://api.bitbucket.org/2.0/repositories/cpmdev/c3po-editor-ui/pullrequests/149"
					},
					"comments": {
						"href": "https://api.bitbucket.org/2.0/repositories/cpmdev/c3po-editor-ui/pullrequests/149/comments"
					},
					"merge": {
						"href": "https://api.bitbucket.org/2.0/repositories/cpmdev/c3po-editor-ui/pullrequests/149/merge"
					},
					"html": {
						"href": "https://bitbucket.org/cpmdev/c3po-editor-ui/pull-requests/149"
					},
					"activity": {
						"href": "https://api.bitbucket.org/2.0/repositories/cpmdev/c3po-editor-ui/pullrequests/149/activity"
					},
					"request-changes": {
						"href": "https://api.bitbucket.org/2.0/repositories/cpmdev/c3po-editor-ui/pullrequests/149/request-changes"
					},
					"diff": {
						"href": "https://api.bitbucket.org/2.0/repositories/cpmdev/c3po-editor-ui/diff/cpmdev/c3po-editor-ui:2e5429d76afa%0D4e306e2a28f9?from_pullrequest_id=149"
					},
					"approve": {
						"href": "https://api.bitbucket.org/2.0/repositories/cpmdev/c3po-editor-ui/pullrequests/149/approve"
					},
					"statuses": {
						"href": "https://api.bitbucket.org/2.0/repositories/cpmdev/c3po-editor-ui/pullrequests/149/statuses"
					}
				},
				"title": "CPM-1745 review apps",
				"close_source_branch": false,
				"reviewers": [],
				"id": 149,
				"destination": {
					"commit": {
						"hash": "4e306e2a28f9",
						"type": "commit",
						"links": {
							"self": {
								"href": "https://api.bitbucket.org/2.0/repositories/cpmdev/c3po-editor-ui/commit/4e306e2a28f9"
							},
							"html": {
								"href": "https://bitbucket.org/cpmdev/c3po-editor-ui/commits/4e306e2a28f9"
							}
						}
					},
					"repository": {
						"links": {
							"self": {
								"href": "https://api.bitbucket.org/2.0/repositories/cpmdev/c3po-editor-ui"
							},
							"html": {
								"href": "https://bitbucket.org/cpmdev/c3po-editor-ui"
							},
							"avatar": {
								"href": "https://bytebucket.org/ravatar/%7Bab734433-b890-41c5-84a0-e62c2b4c3edb%7D?ts=default"
							}
						},
						"type": "repository",
						"name": "c3po-editor-ui",
						"full_name": "cpmdev/c3po-editor-ui",
						"uuid": "{ab734433-b890-41c5-84a0-e62c2b4c3edb}"
					},
					"branch": {
						"name": "master"
					}
				},
				"created_on": "2021-03-15T18:12:56.662501+00:00",
				"summary": {
					"raw": "",
					"markup": "markdown",
					"html": "",
					"type": "rendered"
				},
				"source": {
					"commit": {
						"hash": "2e5429d76afa",
						"type": "commit",
						"links": {
							"self": {
								"href": "https://api.bitbucket.org/2.0/repositories/cpmdev/c3po-editor-ui/commit/2e5429d76afa"
							},
							"html": {
								"href": "https://bitbucket.org/cpmdev/c3po-editor-ui/commits/2e5429d76afa"
							}
						}
					},
					"repository": {
						"links": {
							"self": {
								"href": "https://api.bitbucket.org/2.0/repositories/cpmdev/c3po-editor-ui"
							},
							"html": {
								"href": "https://bitbucket.org/cpmdev/c3po-editor-ui"
							},
							"avatar": {
								"href": "https://bytebucket.org/ravatar/%7Bab734433-b890-41c5-84a0-e62c2b4c3edb%7D?ts=default"
							}
						},
						"type": "repository",
						"name": "c3po-editor-ui",
						"full_name": "cpmdev/c3po-editor-ui",
						"uuid": "{ab734433-b890-41c5-84a0-e62c2b4c3edb}"
					},
					"branch": {
						"name": "CPM-1745-review-apps"
					}
				},
				"comment_count": 0,
				"state": "OPEN",
				"task_count": 0,
				"participants": [],
				"reason": "",
				"updated_on": "2021-03-15T18:12:56.733515+00:00",
				"author": {
					"display_name": "Charles Wooley",
					"uuid": "{b1b44a78-e66b-4ac4-b8d3-61a8f63db0cb}",
					"links": {
						"self": {
							"href": "https://api.bitbucket.org/2.0/users/%7Bb1b44a78-e66b-4ac4-b8d3-61a8f63db0cb%7D"
						},
						"html": {
							"href": "https://bitbucket.org/%7Bb1b44a78-e66b-4ac4-b8d3-61a8f63db0cb%7D/"
						},
						"avatar": {
							"href": "https://secure.gravatar.com/avatar/55a34b746c2fbab2f1ae7fe554dff5f7?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FCW-3.png"
						}
					},
					"nickname": "CharlesWooley",
					"type": "user",
					"account_id": "5c2ce575c9c9fc6f59888f62"
				},
				"merge_commit": null,
				"closed_by": null
			},
			"repository": {
				"scm": "git",
				"website": "",
				"uuid": "{ab734433-b890-41c5-84a0-e62c2b4c3edb}",
				"links": {
					"self": {
						"href": "https://api.bitbucket.org/2.0/repositories/cpmdev/c3po-editor-ui"
					},
					"html": {
						"href": "https://bitbucket.org/cpmdev/c3po-editor-ui"
					},
					"avatar": {
						"href": "https://bytebucket.org/ravatar/%7Bab734433-b890-41c5-84a0-e62c2b4c3edb%7D?ts=default"
					}
				},
				"project": {
					"links": {
						"self": {
							"href": "https://api.bitbucket.org/2.0/workspaces/cpmdev/projects/C3PO"
						},
						"html": {
							"href": "https://bitbucket.org/cpmdev/workspace/projects/C3PO"
						},
						"avatar": {
							"href": "https://bitbucket.org/account/user/cpmdev/projects/C3PO/avatar/32?ts=1542800808"
						}
					},
					"type": "project",
					"name": "C3PO",
					"key": "C3PO",
					"uuid": "{08bf783e-d301-41c5-9591-b3dbf6cc8bba}"
				},
				"full_name": "cpmdev/c3po-editor-ui",
				"owner": {
					"username": "cpmdev",
					"display_name": "cpmdev",
					"type": "team",
					"uuid": "{a8f028b7-826f-47f0-bee1-4000405e5b75}",
					"links": {
						"self": {
							"href": "https://api.bitbucket.org/2.0/teams/%7Ba8f028b7-826f-47f0-bee1-4000405e5b75%7D"
						},
						"html": {
							"href": "https://bitbucket.org/%7Ba8f028b7-826f-47f0-bee1-4000405e5b75%7D/"
						},
						"avatar": {
							"href": "https://bitbucket.org/account/cpmdev/avatar/"
						}
					}
				},
				"workspace": {
					"slug": "cpmdev",
					"type": "workspace",
					"name": "cpmdev",
					"links": {
						"self": {
							"href": "https://api.bitbucket.org/2.0/workspaces/cpmdev"
						},
						"html": {
							"href": "https://bitbucket.org/cpmdev/"
						},
						"avatar": {
							"href": "https://bitbucket.org/workspaces/cpmdev/avatar/?ts=1543692345"
						}
					},
					"uuid": "{a8f028b7-826f-47f0-bee1-4000405e5b75}"
				},
				"type": "repository",
				"is_private": true,
				"name": "c3po-editor-ui"
			},
			"actor": {
				"display_name": "Charles Wooley",
				"uuid": "{b1b44a78-e66b-4ac4-b8d3-61a8f63db0cb}",
				"links": {
					"self": {
						"href": "https://api.bitbucket.org/2.0/users/%7Bb1b44a78-e66b-4ac4-b8d3-61a8f63db0cb%7D"
					},
					"html": {
						"href": "https://bitbucket.org/%7Bb1b44a78-e66b-4ac4-b8d3-61a8f63db0cb%7D/"
					},
					"avatar": {
						"href": "https://secure.gravatar.com/avatar/55a34b746c2fbab2f1ae7fe554dff5f7?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FCW-3.png"
					}
				},
				"nickname": "CharlesWooley",
				"type": "user",
				"account_id": "5c2ce575c9c9fc6f59888f62"
			}
		};
	});
});
