import type { INodeType, INodeTypeDescription } from 'n8n-workflow';

const BASE_PATH = '=/instances/{{$credentials.instanceId}}/token/_';

export class WppApi implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'WPPAPI (WhatsApp)',
		name: 'wppApi',
		icon: 'fa:comments',
		group: ['output'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Envia mensagens de WhatsApp pela WPPAPI (wpp-api.com)',
		defaults: {
			name: 'WPPAPI',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'wppApiApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{$credentials.baseUrl}}',
			headers: {
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				default: 'sendText',
				options: [
					{
						name: 'Enviar Texto',
						value: 'sendText',
						action: 'Enviar mensagem de texto',
						routing: {
							request: {
								method: 'POST',
								url: `${BASE_PATH}/send-text`,
							},
						},
					},
					{
						name: 'Enviar Imagem',
						value: 'sendImage',
						action: 'Enviar imagem',
						routing: {
							request: {
								method: 'POST',
								url: `${BASE_PATH}/send-image`,
							},
						},
					},
					{
						name: 'Enviar Arquivo',
						value: 'sendFile',
						action: 'Enviar arquivo documento',
						routing: {
							request: {
								method: 'POST',
								url: `${BASE_PATH}/send-file`,
							},
						},
					},
					{
						name: 'Verificar Número',
						value: 'checkNumber',
						action: 'Verificar se o número tem whats app',
						routing: {
							request: {
								method: 'GET',
								url: `${BASE_PATH}/check-number`,
							},
						},
					},
					{
						name: 'Status Da Sessão',
						value: 'status',
						action: 'Consultar status da sessão',
						routing: {
							request: {
								method: 'GET',
								url: `${BASE_PATH}/status`,
							},
						},
					},
				],
			},
			{
				displayName: 'Telefone',
				name: 'phone',
				type: 'string',
				default: '',
				required: true,
				placeholder: '5511999999999',
				description: 'Número no formato DDI + DDD + número, só dígitos',
				displayOptions: {
					show: {
						operation: ['sendText', 'sendImage', 'sendFile'],
					},
				},
				routing: {
					send: {
						type: 'body',
						property: 'phone',
					},
				},
			},
			{
				displayName: 'Telefone',
				name: 'phoneQuery',
				type: 'string',
				default: '',
				required: true,
				placeholder: '5511999999999',
				displayOptions: {
					show: {
						operation: ['checkNumber'],
					},
				},
				routing: {
					send: {
						type: 'query',
						property: 'phone',
					},
				},
			},
			{
				displayName: 'Mensagem',
				name: 'message',
				type: 'string',
				typeOptions: { rows: 3 },
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: ['sendText'],
					},
				},
				routing: {
					send: {
						type: 'body',
						property: 'message',
					},
				},
			},
			{
				displayName: 'URL Da Imagem',
				name: 'image',
				type: 'string',
				default: '',
				required: true,
				placeholder: 'https://exemplo.com/foto.jpg',
				displayOptions: {
					show: {
						operation: ['sendImage'],
					},
				},
				routing: {
					send: {
						type: 'body',
						property: 'image',
					},
				},
			},
			{
				displayName: 'URL Do Arquivo',
				name: 'document',
				type: 'string',
				default: '',
				required: true,
				placeholder: 'https://exemplo.com/proposta.pdf',
				displayOptions: {
					show: {
						operation: ['sendFile'],
					},
				},
				routing: {
					send: {
						type: 'body',
						property: 'document',
					},
				},
			},
			{
				displayName: 'Legenda',
				name: 'caption',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						operation: ['sendImage', 'sendFile'],
					},
				},
				routing: {
					send: {
						type: 'body',
						property: 'caption',
					},
				},
			},
		],
	};
}
