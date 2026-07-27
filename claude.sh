#!/bin/bash

set -e
MODEL="qwen3-coder:30b"
echo "Starting CLaude emulator $MODEL"
ollama launch claude --model "$MODEL"
