'use strict';

const bcrypt = require('bcrypt-as-promised');
const boom = require('boom');
const db = require('./db/connection');
const router = require('express').Router();
const jwt = require('jsonwebtoken');

const util = require('./util');
