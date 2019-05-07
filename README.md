**Requirements**

1. Node 10.14.X
2. Docker
3. Docker compose

**Development commands**

1. **start** Launch node process (need mongo deploy)
2. **test** Launch simple test execution
3. **test:coverage** Launch coverage test execution
4. **test:mutation** Launch mutation test

**Launch project**

```bash
docker-compose up
```

**Credentials**

admin:supersecret

**TODO**

1. Better logger integration(winston)
2. Data validation
3. Better error handling
4. Add api manager (kong) in front of service(centraliced security, rate-limit..)
5. Better test
6. In microservice architecture use grpc
