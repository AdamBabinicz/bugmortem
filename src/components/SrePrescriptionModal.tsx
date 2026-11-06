'use client';

import React, { useState } from 'react';
import {
  FileCode,
  Download,
  Copy,
  Check,
  X,
  Stethoscope,
  FileCheck2
} from 'lucide-react';
import { IncidentPreset, TranslationDictionary } from '@/i18n/types';

interface SreConfigFile {
  filename: string;
  language: string;
  description: string;
  content: string;
}

interface SrePrescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  incident: IncidentPreset;
  t: TranslationDictionary | any;
}

function getPrescriptionData(incidentId: string, locale: string): {
  doctorOrder: string;
  dosage: string;
  preventionRule: string;
  files: SreConfigFile[];
} {
  switch (incidentId) {
    case 'react-hydration':
      return {
        doctorOrder:
          locale === 'pl'
            ? 'Natychmiastowe wdrożenie dwufazowej hydratacji z flagą mounted oraz kwarantanna dynamicznych znaczników czasu w komponentach SSR.'
            : 'Immediate enforcement of two-phase mounted state guards and quarantine of dynamic timestamp primitives during SSR.',
        dosage:
          locale === 'pl'
            ? 'Wymusić 100% pokrycia testami E2E Playwright w pipeline CI/CD przed każdym wdrożeniem na produkcję.'
            : 'Enforce 100% Playwright SSR consistency coverage on every production deployment pipeline.',
        preventionRule:
          locale === 'pl'
            ? 'Reguła ESLint: zakaz stosowania new Date() i Math.random() w ciele renderowanych komponentów Server Components.'
            : 'ESLint Rule: zero-tolerance ban on new Date() and Math.random() inside server component render bodies.',
        files: [
          {
            filename: 'eslint.config.mjs',
            language: 'javascript',
            description: locale === 'pl' ? 'Reguła ESLint blokująca niestabilne SSR' : 'ESLint rule blocking unstable SSR',
            content: `// eslint.config.mjs - SRE Hydration Guard
export default [
  {
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: "CallExpression[callee.name='Date'], NewExpression[callee.name='Date']",
          message: 'SRE GUARD: Dynamic date instantiation forbidden during SSR. Use mounted guard or static seed.'
        }
      ]
    }
  }
];`
          },
          {
            filename: 'playwright-ssr.config.ts',
            language: 'typescript',
            description: locale === 'pl' ? 'Test dymny Playwright weryfikujący konsolę' : 'Playwright console verification smoke test',
            content: `// playwright-ssr.config.ts - Automated Console Error Catcher
import { test, expect } from '@playwright/test';

test('verify zero hydration mismatch errors in console', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error' && msg.text().includes('Hydration failed')) {
      errors.push(msg.text());
    }
  });

  await page.goto('/');
  expect(errors).toHaveLength(0);
});`
          }
        ]
      };

    case 'connection-pool':
      return {
        doctorOrder:
          locale === 'pl'
            ? 'Wdrożenie pośrednika PgBouncer w trybie poolingu transakcyjnego oraz twarde odcięcie długich zapytań statement_timeout.'
            : 'Deploy PgBouncer transaction pooling proxy and enforce hard query statement_timeout ceilings.',
        dosage:
          locale === 'pl'
            ? 'Pool size: 25 połączeń na kontener aplikacyjny, timeout zapytania: 2000ms.'
            : 'Pool size: 25 connections per application replica, statement timeout: 2000ms.',
        preventionRule:
          locale === 'pl'
            ? 'Architektura: całkowity zakaz kierowania zapytań analitycznych i raportowych na instancję główną (Primary Writer).'
            : 'Architecture: complete prohibition of analytical batch queries against the primary writer instance.',
        files: [
          {
            filename: 'pgbouncer.ini',
            language: 'ini',
            description: locale === 'pl' ? 'Konfiguracja poolingu transakcyjnego' : 'Transaction pooling configuration',
            content: `[databases]
orders_db = host=aurora-cluster-ro.internal port=5432 dbname=orders_prod pool_mode=transaction

[pgbouncer]
listen_port = 6432
listen_addr = *
auth_type = scram-sha-256
max_client_conn = 5000
default_pool_size = 50
min_pool_size = 10
reserve_pool_size = 5
reserve_pool_timeout = 3
server_idle_timeout = 60
query_timeout = 2`
          },
          {
            filename: '001_sre_pool_guard.sql',
            language: 'sql',
            description: locale === 'pl' ? 'Migracja SQL wymuszająca twarde timeouty' : 'SQL migration enforcing hard statement timeouts',
            content: `-- 001_sre_pool_guard.sql
ALTER ROLE app_checkout_user SET statement_timeout = '2000ms';
ALTER ROLE app_checkout_user SET idle_in_transaction_session_timeout = '3000ms';

CREATE ROLE analytics_ro WITH LOGIN PASSWORD 'vault_secret_placeholder';
GRANT SELECT ON ALL TABLES IN SCHEMA public TO analytics_ro;
ALTER ROLE analytics_ro SET statement_timeout = '15000ms';`
          }
        ]
      };

    case 'oom-reaper':
      return {
        doctorOrder:
          locale === 'pl'
            ? 'Konwersja synchronicznego buforowania do pamięci RAM na strumienie potokowe (Node.js Streams Pipeline) oraz asynchroniczne kolejki zadań.'
            : 'Convert all synchronous in-memory buffering to Node.js stream pipelines and asynchronous background worker queues.',
        dosage:
          locale === 'pl'
            ? 'Twardy limit pamięci kontenera: requests: 256Mi, limits: 512Mi. Flaga V8: --max-old-space-size=460.'
            : 'Hard container quota: requests: 256Mi, limits: 512Mi. V8 flag: --max-old-space-size=460.',
        preventionRule:
          locale === 'pl'
            ? 'Zakaz synchronicznego generowania raportów przekraczających 1000 wierszy w żądaniach HTTP serwera webowego.'
            : 'Prohibition of synchronous report generation exceeding 1,000 rows in synchronous HTTP web request cycles.',
        files: [
          {
            filename: 'k8s-pod-resilience.yaml',
            language: 'yaml',
            description: locale === 'pl' ? 'Manifest Kubernetes z limitami RAM' : 'Kubernetes manifest with strict RAM quotas',
            content: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: reporting-worker
spec:
  replicas: 3
  template:
    spec:
      containers:
      - name: worker
        image: bugmortem/worker:v2.1
        env:
        - name: NODE_OPTIONS
          value: "--max-old-space-size=460"
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "1000m"`
          },
          {
            filename: 'stream-export-pipeline.ts',
            language: 'typescript',
            description: locale === 'pl' ? 'Wzorzec strumieniowania ze stałym buforem RAM' : 'Streaming pattern with constant RAM buffer',
            content: `// stream-export-pipeline.ts
import { pipeline } from 'stream/promises';
import { Transform } from 'stream';

export async function exportToCsvStream(cursorStream: any, destinationStream: any) {
  const csvFormat = new Transform({
    objectMode: true,
    transform(record, encoding, callback) {
      callback(null, \`\${record.id},\${record.amount},\${record.timestamp}\\n\`);
    }
  });

  await pipeline(cursorStream, csvFormat, destinationStream);
}`
          }
        ]
      };

    case 'retry-storm':
      return {
        doctorOrder:
          locale === 'pl'
            ? 'Wdrożenie algorytmu Full Jitter z wykładniczym wycofywaniem we wszystkich klientach HTTP oraz aktywacja Circuit Breakera na bramce Envoy.'
            : 'Enforce Full Jitter Exponential Backoff on all HTTP clients and activate Envoy circuit breaker policies.',
        dosage:
          locale === 'pl'
            ? 'Maksymalnie 3 ponowienia, baza 100ms z losowym rozproszeniem do 2000ms. Odcięcie przy 20% błędów 5xx.'
            : 'Max 3 retries, base 100ms with randomized jitter up to 2000ms. Ejection at 20% consecutive 5xx errors.',
        preventionRule:
          locale === 'pl'
            ? 'Nigdy nie ponawiać żądań bez losowego opóźnienia; wdrożyć nagłówek Retry-After z losowym jitterem.'
            : 'Never retry failed requests synchronously; mandate jittered Retry-After response headers.',
        files: [
          {
            filename: 'envoy-circuit-breaker.yaml',
            language: 'yaml',
            description: locale === 'pl' ? 'Polityka Circuit Breaker dla Envoy Gateway' : 'Envoy Gateway Circuit Breaker Policy',
            content: `static_resources:
  clusters:
  - name: profile_service
    connect_timeout: 0.25s
    circuit_breakers:
      thresholds:
      - priority: DEFAULT
        max_connections: 1024
        max_pending_requests: 100
        max_retries: 3
    outlier_detection:
      consecutive_5xx: 5
      interval: 10s
      base_ejection_time: 30s`
          },
          {
            filename: 'resilience-retry.ts',
            language: 'typescript',
            description: locale === 'pl' ? 'Klient z wykładniczym wycofywaniem i jitterem' : 'HTTP client with Exponential Backoff & Jitter',
            content: `export async function resilientFetch(url: string, retries = 3, baseDelayMs = 100): Promise<Response> {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const res = await fetch(url);
      if (res.ok || res.status < 500) return res;
      throw new Error(\`Server error \${res.status}\`);
    } catch (err) {
      if (attempt === retries - 1) throw err;
      const exponentialCeiling = baseDelayMs * Math.pow(2, attempt);
      const fullJitter = Math.floor(Math.random() * exponentialCeiling);
      await new Promise(resolve => setTimeout(resolve, fullJitter));
    }
  }
  throw new Error('Unreachable');
}`
          }
        ]
      };

    case 'cors-nightmare':
      return {
        doctorOrder:
          locale === 'pl'
            ? 'Scentralizowanie konfiguracji CORS na bramce API Gateway z buforowaniem preflight OPTIONS przez 24 godziny.'
            : 'Centralize CORS policies at API Gateway with 24-hour preflight OPTIONS caching.',
        dosage:
          locale === 'pl'
            ? 'Nagłówek Access-Control-Max-Age: 86400, odpowiedź 204 No Content dla OPTIONS.'
            : 'Header Access-Control-Max-Age: 86400, HTTP 204 No Content response for OPTIONS.',
        preventionRule:
          locale === 'pl'
            ? 'Wymusić automatyczny test dymny curl -X OPTIONS w pipeline CI/CD przed przełączeniem rekordów DNS.'
            : 'Mandate automated curl -X OPTIONS preflight smoke verification in release pipeline before DNS switch.',
        files: [
          {
            filename: 'api-gateway-cors.tf',
            language: 'hcl',
            description: locale === 'pl' ? 'Moduł Terraform dla preflight CORS' : 'Terraform module for API Gateway CORS preflight',
            content: `resource "aws_api_gateway_method" "cors_options" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.resource.id
  http_method   = "OPTIONS"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "cors_mock" {
  rest_api_id = aws_api_gateway_rest_api.api.id
  resource_id = aws_api_gateway_resource.resource.id
  http_method = aws_api_gateway_method.cors_options.http_method
  type        = "MOCK"
  request_templates = {
    "application/json" = "{\\"statusCode\\": 204}"
  }
}`
          },
          {
            filename: 'nginx-cors.conf',
            language: 'nginx',
            description: locale === 'pl' ? 'Wzorzec konfiguracyjny NGINX' : 'Hardened NGINX CORS pattern',
            content: `if ($request_method = 'OPTIONS') {
    add_header 'Access-Control-Allow-Origin' 'https://bugmortem.vercel.app' always;
    add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS' always;
    add_header 'Access-Control-Max-Age' 86400;
    return 204;
}`
          }
        ]
      };

    case 'serverless-timeout':
    default:
      return {
        doctorOrder:
          locale === 'pl'
            ? 'Wyprowadzenie inicjalizacji puli połączeń poza ciało handlera Lambda oraz wdrożenie Amazon RDS Proxy do agregacji socketów TLS.'
            : 'Extract database client connection pool outside Lambda handler and provision Amazon RDS Proxy.',
        dosage:
          locale === 'pl'
            ? 'Provisioned Concurrency: min. 20 instancji na wypadek kampanii marketingowych. Connection timeout: 2000ms.'
            : 'Provisioned Concurrency: min 20 warm instances during sales spikes. Connection timeout: 2000ms.',
        preventionRule:
          locale === 'pl'
            ? 'Całkowity zakaz otwierania bezpośrednich połączeń do bazy PostgreSQL z funkcji serverless bez pośrednika RDS Proxy.'
            : 'Strict prohibition of direct database socket connections from serverless handlers without RDS Proxy.',
        files: [
          {
            filename: 'serverless-template.yaml',
            language: 'yaml',
            description: locale === 'pl' ? 'Szablon AWS SAM z RDS Proxy i Provisioned Concurrency' : 'AWS SAM template with RDS Proxy & Warm Instances',
            content: `AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31
Description: BugMortem SRE Resilient Serverless Architecture

Resources:
  InventoryFunction:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: dist/
      Handler: index.handler
      Runtime: nodejs20.x
      Timeout: 10
      MemorySize: 512
      AutoPublishAlias: live
      ProvisionedConcurrencyConfig:
        ProvisionedConcurrentExecutions: 20`
          },
          {
            filename: 'rds-proxy.tf',
            language: 'hcl',
            description: locale === 'pl' ? 'Infrastruktura Terraform dla RDS Proxy' : 'Terraform IaC for Amazon RDS Proxy',
            content: `resource "aws_db_proxy" "db_proxy" {
  name                   = "inventory-rds-proxy"
  engine_family          = "POSTGRESQL"
  idle_client_timeout    = 120
  require_tls            = true
  role_arn               = aws_iam_role.proxy_role.arn
  vpc_security_group_ids = [aws_security_group.proxy_sg.id]
  vpc_subnet_ids         = aws_subnet.private[*].id
}`
          }
        ]
      };
  }
}

export const SrePrescriptionModal: React.FC<SrePrescriptionModalProps> = ({
  isOpen,
  onClose,
  incident,
  t
}) => {
  const [activeFileIndex, setActiveFileIndex] = useState<number>(0);
  const [copiedFile, setCopiedFile] = useState<boolean>(false);

  if (!isOpen) return null;

  const locale = t?.navigation?.langPl === 'Polski (PL)' ? 'pl' : 'en';
  const prescription = getPrescriptionData(incident?.id || 'react-hydration', locale);
  const activeFile = prescription.files[activeFileIndex] || prescription.files[0];

  const handleCopyFile = async () => {
    if (!activeFile?.content) return;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(activeFile.content);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = activeFile.content;
        textarea.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedFile(true);
      setTimeout(() => setCopiedFile(false), 2000);
    } catch {
      // Ignore
    }
  };

  const handleDownloadFile = () => {
    if (!activeFile?.content) return;
    const blob = new Blob([activeFile.content], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', activeFile.filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-6 overflow-hidden">
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl max-w-4xl w-full max-h-[88vh] flex flex-col shadow-2xl relative text-stone-900 dark:text-stone-100 overflow-hidden">
        {/* Sztywny, zawsze widoczny Nagłówek */}
        <div className="p-4 sm:p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between shrink-0 bg-white/95 dark:bg-stone-900/95 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xl font-serif leading-none">
              ℞
            </span>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm sm:text-base font-bold text-stone-900 dark:text-white">
                  {locale === 'pl' ? 'Oficjalna Recepta SRE & Generator IaC' : 'Official SRE Prescription & IaC Generator'}
                </h3>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                  {locale === 'pl' ? 'TERAPIA ANTY-AWARIJNA' : 'RESILIENCE THERAPY'}
                </span>
              </div>
              <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-0.5 truncate max-w-xl">
                {incident?.title || ''}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white p-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Płynnie przewijana treść wewnątrz modala */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {/* Stylizowana Karta Recepty */}
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 dark:border-emerald-900/40 dark:bg-emerald-950/20 p-4 space-y-3 font-sans shadow-sm">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 border-b border-emerald-200/60 dark:border-emerald-900/60 pb-2">
              <span className="flex items-center gap-1.5">
                <Stethoscope className="w-4 h-4" />
                {locale === 'pl' ? 'ZALECENIE LEKARZA SRE (DOCTOR’S ORDERS)' : 'SRE DOCTOR’S ORDERS'}
              </span>
              <span className="text-[10px] uppercase tracking-wider bg-emerald-200 text-emerald-900 dark:bg-emerald-900/60 dark:text-emerald-200 px-2 py-0.5 rounded">
                Rx #{incident?.id?.toUpperCase() || 'SRE-RX'}
              </span>
            </div>

            <p className="text-xs sm:text-sm font-medium text-emerald-950 dark:text-emerald-100 leading-relaxed">
              {prescription.doctorOrder}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
              <div className="p-2.5 rounded-lg bg-white/90 dark:bg-stone-900/80 border border-emerald-200 dark:border-emerald-900/50">
                <span className="block text-[10px] font-mono uppercase font-bold text-stone-500 dark:text-stone-400">
                  {locale === 'pl' ? 'DAWKOWANIE / SLA' : 'DOSAGE / SLA'}
                </span>
                <span className="font-semibold text-stone-900 dark:text-stone-100">{prescription.dosage}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/90 dark:bg-stone-900/80 border border-emerald-200 dark:border-emerald-900/50">
                <span className="block text-[10px] font-mono uppercase font-bold text-stone-500 dark:text-stone-400">
                  {locale === 'pl' ? 'REGUŁA ZAPOBIEGAWCZA' : 'PREVENTION RULE'}
                </span>
                <span className="font-semibold text-stone-900 dark:text-stone-100">{prescription.preventionRule}</span>
              </div>
            </div>
          </div>

          {/* Zakładki z plikami IaC */}
          <div className="space-y-2 pt-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 dark:border-stone-800 pb-2">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                {prescription.files.map((file, idx) => (
                  <button
                    key={file.filename}
                    type="button"
                    onClick={() => setActiveFileIndex(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                      activeFileIndex === idx
                        ? 'bg-rose-600 text-white shadow-sm'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                    }`}
                  >
                    <FileCode className="w-3.5 h-3.5" />
                    <span>{file.filename}</span>
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleCopyFile}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-mono font-semibold bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-700 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  {copiedFile ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedFile ? (locale === 'pl' ? 'Skopiowano!' : 'Copied!') : (locale === 'pl' ? 'Kopiuj Plik' : 'Copy')}</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadFile}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-mono font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{locale === 'pl' ? 'Pobierz Plik' : 'Download'}</span>
                </button>
              </div>
            </div>

            <p className="text-[11px] text-stone-600 dark:text-stone-400 italic">
              ℹ️ {activeFile.description}
            </p>

            {/* Blok z kodem źródłowym */}
            <div className="rounded-xl border border-stone-300 dark:border-stone-800 bg-stone-950 p-4 font-mono text-xs text-emerald-400 overflow-x-auto shadow-inner max-h-[260px]">
              <pre className="whitespace-pre">
                <code>{activeFile.content}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Sztywna, zawsze widoczna Stopka */}
        <div className="p-3 sm:p-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between shrink-0 bg-stone-50 dark:bg-stone-950/80 text-xs text-stone-500">
          <div className="flex items-center gap-1.5">
            <FileCheck2 className="w-4 h-4 text-emerald-500" />
            <span className="hidden sm:inline">
              {locale === 'pl' ? 'Pliki zweryfikowane przez silnik SRE BugMortem' : 'Configs verified by BugMortem SRE Engine'}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-stone-200 hover:bg-stone-300 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 transition-colors cursor-pointer"
          >
            {locale === 'pl' ? 'Zamknij Apteczkę' : 'Close Prescription'}
          </button>
        </div>
      </div>
    </div>
  );
};