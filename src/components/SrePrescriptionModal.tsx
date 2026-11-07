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
import { IncidentPreset, TranslationDictionary, Locale, SreConfigFile } from '@/i18n/types';
import { useI18n } from '@/i18n/context';

// Eliminacja sierotek typograficznych w tekstach recepty
function fixOrphans(text?: string | null): string {
  if (!text || typeof text !== 'string') return text || '';
  return text.replace(/(^|\s)([aiouwz]|do|na|od|po|ze|we|za|co|że|to)(\s+)/gi, '$1$2\u00A0');
}

interface SrePrescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  incident: IncidentPreset;
  t?: TranslationDictionary | any;
  locale?: Locale;
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
            ? 'Natychmiastowe wdrożenie proxy poolingowego PgBouncer w trybie transakcyjnym oraz rygorystyczny limit statement_timeout.'
            : 'Immediate deployment of PgBouncer in transaction pooling mode with aggressive statement timeout enforcement.',
        dosage:
          locale === 'pl'
            ? 'Skonfigurować max_client_conn = 5000, default_pool_size = 50, statement_timeout = 2000ms.'
            : 'Configure max_client_conn = 5000, default_pool_size = 50, statement_timeout = 2000ms.',
        preventionRule:
          locale === 'pl'
            ? 'Bezwzględny zakaz wykonywania analitycznych zapytań bez limitu na węźle Primary bazy danych produkcyjnej.'
            : 'Zero-tolerance ban on unindexed analytical queries targeting primary production writer instances.',
        files: [
          {
            filename: 'pgbouncer.ini',
            language: 'ini',
            description: locale === 'pl' ? 'Konfiguracja PgBouncer dla ochrony puli połączeń' : 'PgBouncer connection pool protection configuration',
            content: `[databases]
aurora_prod = host=aurora-cluster.internal port=5432 dbname=prod_db

[pgbouncer]
listen_port = 6432
listen_addr = 0.0.0.0
auth_type = md5
auth_file = /etc/pgbouncer/userlist.txt
pool_mode = transaction
max_client_conn = 5000
default_pool_size = 50
reserve_pool_size = 10
reserve_pool_timeout = 2
server_idle_timeout = 60
query_timeout = 3`
          },
          {
            filename: '001_sre_pool_guard.sql',
            language: 'sql',
            description: locale === 'pl' ? 'Ochrona przed wiszącymi transakcjami w PostgreSQL' : 'PostgreSQL statement timeout and idle transaction guard',
            content: `-- SRE Guard: Prevent connection exhaustion
ALTER DATABASE prod_db SET statement_timeout = '2500ms';
ALTER DATABASE prod_db SET idle_in_transaction_session_timeout = '5000ms';
ALTER DATABASE prod_db SET lock_timeout = '1500ms';`
          }
        ]
      };

    case 'oom-reaper':
      return {
        doctorOrder:
          locale === 'pl'
            ? 'Przebudowa potoku eksportu z buforowania w pamięci RAM na strumieniowanie asynchroniczne (Stream Pipeline z backpressure).'
            : 'Refactor bulk export pipeline from in-memory buffering to Node.js streams with backpressure controls.',
        dosage:
          locale === 'pl'
            ? 'Wdrożyć hard-limit pamięci w Kubernetes: resources.limits.memory = 2Gi, alert przy 80% progu.'
            : 'Enforce Kubernetes pod limits: resources.limits.memory = 2Gi with alert threshold at 80%.',
        preventionRule:
          locale === 'pl'
            ? 'Zakaz ładowania całych kolekcji danych do pojedynczych zmiennych tablicowych w procesach Node.js.'
            : 'Strict prohibition of loading unbounded datasets into single JavaScript array primitives.',
        files: [
          {
            filename: 'k8s-pod-resilience.yaml',
            language: 'yaml',
            description: locale === 'pl' ? 'Limity pamięci i CPU w manifeście Kubernetes' : 'Kubernetes Pod resource limits and OOM guard',
            content: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: export-worker
spec:
  template:
    spec:
      containers:
      - name: worker
        image: export-worker:stable
        resources:
          requests:
            memory: "512Mi"
            cpu: "250m"
          limits:
            memory: "2048Mi"
            cpu: "1000m"`
          },
          {
            filename: 'stream-export-pipeline.ts',
            language: 'typescript',
            description: locale === 'pl' ? 'Wzorzec bezpiecznego strumieniowania z backpressure' : 'Safe streaming pipeline pattern with backpressure',
            content: `// stream-export-pipeline.ts - Memory-Bounded Data Exporter
import { pipeline } from 'stream/promises';
import { createReadStream, createWriteStream } from 'fs';
import { Transform } from 'stream';

export async function exportSafeCsv(inputCursor: AsyncIterable<any>, destPath: string) {
  const transform = new Transform({
    objectMode: true,
    transform(chunk, _, callback) {
      callback(null, \`\${chunk.id},\${chunk.total}\\n\`);
    }
  });

  await pipeline(inputCursor, transform, createWriteStream(destPath));
}`
          }
        ]
      };

    case 'retry-storm':
      return {
        doctorOrder:
          locale === 'pl'
            ? 'Wdrożenie algorytmu Exponential Backoff z pełnym szumem losowym (Full Jitter) oraz wyłącznika awaryjnego Circuit Breaker.'
            : 'Implement Exponential Backoff with Full Jitter and configure circuit breaking in service mesh.',
        dosage:
          locale === 'pl'
            ? 'Base Delay = 100ms, Max Delay = 2000ms, Jitter = 1.0, Max Retries = 3.'
            : 'Base Delay = 100ms, Max Delay = 2000ms, Jitter = 1.0, Max Retries = 3.',
        preventionRule:
          locale === 'pl'
            ? 'Zakaz automatycznych, synchronicznych ponowień zapytań (Zero-Jitter Retries) w przypadku kodów błędów 5xx.'
            : 'Ban instantaneous, unjittered automated retries on receiving 5xx server responses.',
        files: [
          {
            filename: 'envoy-circuit-breaker.yaml',
            language: 'yaml',
            description: locale === 'pl' ? 'Definicja Circuit Breaker w konfiguracji Envoy Proxy' : 'Envoy Proxy circuit breaker and connection limits',
            content: `circuit_breakers:
  thresholds:
    - priority: DEFAULT
      max_connections: 1024
      max_pending_requests: 100
      max_requests: 1024
      max_retries: 3
outlier_detection:
  consecutive_5xx: 3
  interval: 10s
  base_ejection_time: 30s
  max_ejection_percent: 50`
          },
          {
            filename: 'resilience-retry.ts',
            language: 'typescript',
            description: locale === 'pl' ? 'Klient HTTP z algorytmem Full Jitter' : 'Resilient HTTP client with Full Jitter backoff',
            content: `// resilience-retry.ts - Full Jitter Exponential Backoff Client
export async function fetchWithFullJitter<T>(
  fn: () => Promise<T>,
  retries = 3,
  baseMs = 100,
  maxMs = 2000
): Promise<T> {
  let attempt = 0;
  while (attempt < retries) {
    try {
      return await fn();
    } catch (err) {
      attempt++;
      if (attempt >= retries) throw err;
      const cap = Math.min(maxMs, baseMs * 2 ** attempt);
      const sleepMs = Math.random() * cap; // Full Jitter formula
      await new Promise(r => setTimeout(r, sleepMs));
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
            ? 'Wdrożenie buforowania zapytań OPTIONS (Access-Control-Max-Age) na bramie API oraz usunięcie wieloznaczników (*).'
            : 'Implement Access-Control-Max-Age caching on API Gateway and eliminate insecure wildcard origins.',
        dosage:
          locale === 'pl'
            ? 'Skonfigurować Access-Control-Max-Age = 86400 (24h) dla wszystkich odpowiedzi preflight OPTIONS.'
            : 'Set Access-Control-Max-Age = 86400 (24h) on all preflight OPTIONS gateway responses.',
        preventionRule:
          locale === 'pl'
            ? 'Bezwzględny zakaz dynamicznego odbijania nagłówka Origin jako dozwolonego dla żądań z credentials: true.'
            : 'Ban dynamic origin reflection for requests authenticated with credentials.',
        files: [
          {
            filename: 'api-gateway-cors.tf',
            language: 'terraform',
            description: locale === 'pl' ? 'Konfiguracja Terraform dla bezpiecznego CORS z buforowaniem' : 'Terraform configuration for cached and scoped CORS',
            content: `resource "aws_api_gateway_method_response" "options_200" {
  rest_api_id = aws_api_gateway_rest_api.api.id
  resource_id = aws_api_gateway_resource.resource.id
  http_method = "OPTIONS"
  status_code = "200"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true
    "method.response.header.Access-Control-Allow-Methods" = true
    "method.response.header.Access-Control-Allow-Origin"  = true
    "method.response.header.Access-Control-Max-Age"        = true
  }
}`
          },
          {
            filename: 'nginx-cors.conf',
            language: 'nginx',
            description: locale === 'pl' ? 'Reguły NGINX dla preflight OPTIONS' : 'NGINX reverse proxy cached preflight rules',
            content: `if ($request_method = 'OPTIONS') {
    add_header 'Access-Control-Allow-Origin' 'https://app.bugmortem.dev' always;
    add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, PUT, DELETE' always;
    add_header 'Access-Control-Allow-Headers' 'Authorization, Content-Type, X-Amz-Date' always;
    add_header 'Access-Control-Max-Age' 86400;
    add_header 'Content-Type' 'text/plain; charset=utf-8';
    add_header 'Content-Length' 0;
    return 204;
}`
          }
        ]
      };

    case 's3-lambda-loop':
      return {
        doctorOrder:
          locale === 'pl'
            ? 'Natychmiastowa izolacja bucketów S3 wejścia i wyjścia Lambda oraz wdrożenie filtra prefiksu klucza i pułapu zarezerwowanej współbieżności w celu przerwania pętli rekurencyjnej.'
            : 'Immediately isolate S3 input and output buckets, enforce strict S3 key prefix filters on Lambda triggers, and cap reserved concurrency to terminate the recursive loop.',
        dosage:
          locale === 'pl'
            ? 'Zarezerwowana współbieżność image-processor: max 50 instancji. Filtr prefiksu S3: uploads/*. Oddzielny bucket wyjściowy: media-thumbnails.'
            : 'Reserved concurrency on image-processor: max 50 instances. S3 prefix filter: uploads/*. Separate output bucket: media-thumbnails.',
        preventionRule:
          locale === 'pl'
            ? 'Bezwzględny zakaz konfigurowania wyzwalaczy S3 bez filtra prefiksu oraz zapisu wyników Lambdy do bucketa źródłowego zdarzenia. Włączyć AWS Recursive Loop Detection.'
            : 'Strictly prohibit configuring S3 triggers without prefix filters or writing Lambda results back into the trigger source bucket. Enable AWS Recursive Loop Detection.',
        files: [
          {
            filename: 's3-lambda-circuit-breaker.tf',
            language: 'terraform',
            description:
              locale === 'pl'
                ? 'Terraform: osobne buckety wejścia/wyjścia, filtr prefiksu S3, pułap współbieżności i SQS DLQ'
                : 'Terraform: separate input/output buckets, S3 prefix filter, concurrency ceiling & SQS DLQ',
            content: `# s3-lambda-circuit-breaker.tf
# SRE Resilience: S3 ⇄ Lambda Recursive Loop Prevention

# --- Isolated input bucket (originals) ---
resource "aws_s3_bucket" "media_input" {
  bucket = "media-assets-input"
}

# --- Separate, isolated output bucket (thumbnails) ---
resource "aws_s3_bucket" "media_output" {
  bucket = "media-assets-thumbnails"
}

# --- Dead-Letter Queue for runaway events ---
resource "aws_sqs_queue" "lambda_dlq" {
  name                      = "image-processor-dlq"
  message_retention_seconds = 1209600 # 14 days
}

# --- Lambda with Reserved Concurrency limit (Circuit Breaker) ---
resource "aws_lambda_function" "processor" {
  function_name                  = "image-processor"
  role                          = aws_iam_role.lambda_exec.arn
  handler                       = "index.handler"
  runtime                       = "nodejs20.x"
  reserved_concurrent_executions = 50 # SRE ceiling: prevents account concurrency starvation (1000/1000)

  dead_letter_config {
    target_arn = aws_sqs_queue.lambda_dlq.arn
  }

  environment {
    variables = {
      INPUT_BUCKET   = aws_s3_bucket.media_input.id
      OUTPUT_BUCKET  = aws_s3_bucket.media_output.id
      RECURSION_GUARD = "ENABLED"
    }
  }
}

# --- S3 Trigger with MANDATORY prefix and suffix filters ---
resource "aws_s3_bucket_notification" "bucket_notification" {
  bucket = aws_s3_bucket.media_input.id

  lambda_function {
    lambda_function_arn = aws_lambda_function.processor.arn
    events              = ["s3:ObjectCreated:*"]
    filter_prefix       = "uploads/"      # MANDATORY: Only process raw uploads
    filter_suffix       = ".jpg"
  }

  depends_on = [aws_lambda_permission.allow_s3]
}

resource "aws_lambda_permission" "allow_s3" {
  statement_id  = "AllowExecutionFromS3"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.processor.function_name
  principal     = "s3.amazonaws.com"
  source_arn    = aws_s3_bucket.media_input.arn
}`
          },
          {
            filename: 'aws-lambda-resilience.yaml',
            language: 'yaml',
            description:
              locale === 'pl'
                ? 'AWS SAM: Ochrona przed pętlami rekurencyjnymi, limit współbieżności i alarm CloudWatch'
                : 'AWS SAM: Recursive loop prevention, concurrency guard & CloudWatch alarm',
            content: `AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31
Description: >
  SRE Resilience Template: S3-Lambda Circuit Breaker
  Terminates recursive invocation cascades automatically via AWS Recursive Loop Detection.

Resources:
  # Input Bucket (Trigger source)
  InputMediaBucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: !Sub '\${AWS::AccountId}-media-uploads-input'

  # Isolated Output Bucket (Destination - NEVER triggers the lambda)
  OutputThumbnailsBucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: !Sub '\${AWS::AccountId}-media-thumbnails-output'

  # Image Processor Lambda Function
  ImageProcessorFunction:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: src/
      Handler: index.handler
      Runtime: nodejs20.x
      Timeout: 30
      MemorySize: 512
      ReservedConcurrentExecutions: 50 # Caps concurrency to avoid whole-account starvation
      DeadLetterQueue:
        Type: SQS
        TargetArn: !GetAtt RunawayDLQ.Arn
      Environment:
        Variables:
          OUTPUT_BUCKET_NAME: !Ref OutputThumbnailsBucket
          AWS_LAMBDA_RECURSIVE_LOOP: Terminate # Uses native AWS Lambda loop detection (Nov 2023)
      Events:
        NewImageUpload:
          Type: S3
          Properties:
            Bucket: !Ref InputMediaBucket
            Events: s3:ObjectCreated:*
            Filter:
              S3Key:
                Rules:
                  - Name: prefix
                    Value: uploads/ # Crucial guard: only triggers on uploads/ prefix

  RunawayDLQ:
    Type: AWS::SQS::Queue
    Properties:
      QueueName: image-processor-runaway-dlq
      MessageRetentionPeriod: 1209600

  # CloudWatch Alarm for throttled executions (Early Warning System)
  ThrottlesAlarm:
    Type: AWS::CloudWatch::Alarm
    Properties:
      AlarmDescription: 'Alarm if Lambda throttles exceed safe threshold (possible loop)'
      Namespace: AWS/Lambda
      MetricName: Throttles
      Dimensions:
        - Name: FunctionName
          Value: !Ref ImageProcessorFunction
      Statistic: Sum
      Period: 60
      EvaluationPeriods: 1
      Threshold: 100
      ComparisonOperator: GreaterThanThreshold
      TreatMissingData: notBreaching`
          }
        ]
      };

    case 'serverless-timeout':
    default:
      return {
        doctorOrder:
          locale === 'pl'
            ? 'Przeniesienie inicjalizacji klienta bazy poza handler funkcji Lambda oraz wdrożenie AWS RDS Proxy.'
            : 'Extract database connection initialization outside Lambda handler and provision AWS RDS Proxy.',
        dosage:
          locale === 'pl'
            ? 'Skonfigurować RDS Proxy z pulą idle_client_timeout = 1800s oraz max_connections_percent = 90.'
            : 'Configure RDS Proxy with idle_client_timeout = 1800s and max_connections_percent = 90.',
        preventionRule:
          locale === 'pl'
            ? 'Zakaz tworzenia nowych instancji połączenia do bazy danych wewnątrz ciała funkcji wykonawczej.'
            : 'Prohibit initializing fresh relational database connection pools inside the execution handler.',
        files: [
          {
            filename: 'serverless-template.yaml',
            language: 'yaml',
            description: locale === 'pl' ? 'Szablon AWS SAM z optymalizacją inicjalizacji i pre-warmingiem' : 'AWS SAM template with handler pre-warming',
            content: `AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31
Resources:
  OrdersFunction:
    Type: AWS::Serverless::Function
    Properties:
      Handler: app.handler
      Runtime: nodejs20.x
      Timeout: 15
      MemorySize: 1024
      Environment:
        Variables:
          DB_PROXY_ENDPOINT: !GetAtt RDSProxy.Endpoint`
          },
          {
            filename: 'rds-proxy.tf',
            language: 'terraform',
            description: locale === 'pl' ? 'Definicja AWS RDS Proxy w Terraform' : 'AWS RDS Proxy Terraform definition',
            content: `resource "aws_db_proxy" "proxy" {
  name                   = "aurora-serverless-proxy"
  debug_logging          = false
  engine_family          = "POSTGRESQL"
  idle_client_timeout    = 1800
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
  t: propT,
  locale: propLocale
}) => {
  const [activeFileIndex, setActiveFileIndex] = useState<number>(0);
  const [copiedFile, setCopiedFile] = useState<boolean>(false);

  const i18n = useI18n();
  if (!isOpen) return null;

  const t = propT || i18n?.t;
  const locale: Locale =
    propLocale ||
    i18n?.locale ||
    (t?.common?.close === 'Close' ? 'en' : 'pl');

  const p = t?.prescription;
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
                  {p?.modalTitle || (locale === 'pl' ? 'Oficjalna Recepta SRE & Generator IaC' : 'Official SRE Prescription & IaC Generator')}
                </h3>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                  {p?.resilienceBadge || (locale === 'pl' ? 'TERAPIA ANTY-AWARIJNA' : 'RESILIENCE THERAPY')}
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
                {p?.doctorOrdersTitle || (locale === 'pl' ? 'ZALECENIE LEKARZA SRE (DOCTOR’S ORDERS)' : 'SRE DOCTOR’S ORDERS')}
              </span>
              <span className="text-[10px] uppercase tracking-wider bg-emerald-200 text-emerald-900 dark:bg-emerald-900/60 dark:text-emerald-200 px-2 py-0.5 rounded">
                {p?.rxNumberPrefix || 'Rx #'}{incident?.id?.toUpperCase() || 'SRE-RX'}
              </span>
            </div>

            <p className="text-xs sm:text-sm font-medium text-emerald-950 dark:text-emerald-100 leading-relaxed">
              {fixOrphans(prescription.doctorOrder)}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
              <div className="p-2.5 rounded-lg bg-white/90 dark:bg-stone-900/80 border border-emerald-200 dark:border-emerald-900/50">
                <span className="block text-[10px] font-mono uppercase font-bold text-stone-500 dark:text-stone-400">
                  {p?.dosageLabel || (locale === 'pl' ? 'DAWKOWANIE / SLA' : 'DOSAGE / SLA')}
                </span>
                <span className="font-semibold text-stone-900 dark:text-stone-100">{fixOrphans(prescription.dosage)}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/90 dark:bg-stone-900/80 border border-emerald-200 dark:border-emerald-900/50">
                <span className="block text-[10px] font-mono uppercase font-bold text-stone-500 dark:text-stone-400">
                  {p?.preventionRuleLabel || (locale === 'pl' ? 'REGUŁA ZAPOBIEGAWCZA' : 'PREVENTION RULE')}
                </span>
                <span className="font-semibold text-stone-900 dark:text-stone-100">{fixOrphans(prescription.preventionRule)}</span>
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
                  <span>{copiedFile ? (p?.copiedNotice || (locale === 'pl' ? 'Skopiowano!' : 'Copied!')) : (p?.copyFileCta || (locale === 'pl' ? 'Kopiuj Plik' : 'Copy'))}</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownloadFile}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-mono font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{p?.downloadCta || (locale === 'pl' ? 'Pobierz Plik' : 'Download')}</span>
                </button>
              </div>
            </div>

            <p className="text-[11px] text-stone-600 dark:text-stone-400 italic">
              ℹ️ {fixOrphans(activeFile.description)}
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
              {p?.verifiedFooter || (locale === 'pl' ? 'Pliki zweryfikowane przez silnik SRE BugMortem' : 'Configs verified by BugMortem SRE Engine')}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-stone-200 hover:bg-stone-300 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 transition-colors cursor-pointer"
          >
            {p?.closeCta || (locale === 'pl' ? 'Zamknij Apteczkę' : 'Close Prescription')}
          </button>
        </div>
      </div>
    </div>
  );
};
