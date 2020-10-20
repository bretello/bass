#!/bin/bash
# This has to be run in a virtualenv with gunicorn and all other dependencies

gunicorn bass:app
