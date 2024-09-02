{{- define "my-cronjob.name" -}}
{{ .Chart.Name }}-{{ .Release.Name }}
{{- end -}}
