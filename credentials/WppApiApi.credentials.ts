import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class WppApiApi implements ICredentialType {
	name = 'wppApiApi';

	displayName = 'WPPAPI API';

	documentationUrl = 'https://wpp-api.com/docs?utm_source=n8n&utm_medium=node';

	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://api.wpp-api.com',
			required: true,
		},
		{
			displayName: 'Instance ID',
			name: 'instanceId',
			type: 'string',
			default: '',
			required: true,
			description: 'ID público da instância (painel WPPAPI)',
		},
		{
			displayName: 'Token',
			name: 'token',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description: 'Token da instância (painel WPPAPI)',
		},
	];

	// Token vai no header Client-Token; o path usa "_" no lugar do token.
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'Client-Token': '={{$credentials.token}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl}}',
			url: '=/instances/{{$credentials.instanceId}}/token/_/status',
		},
	};
}
