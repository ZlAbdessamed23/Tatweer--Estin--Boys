-- CreateEnum
CREATE TYPE "DepartementType" AS ENUM ('sales', 'marketing', 'finance', 'humanResources', 'operations', 'engineering', 'product', 'design', 'customerSupport', 'dataScience', 'logistics', 'legal', 'it', 'other');

-- CreateEnum
CREATE TYPE "ColumnType" AS ENUM ('email', 'phoneNumber', 'string', 'number', 'url', 'date', 'time');

-- CreateTable
CREATE TABLE "Admin" (
    "adminId" TEXT NOT NULL,
    "adminFirstName" TEXT NOT NULL,
    "adminLastName" TEXT NOT NULL,
    "adminEmail" TEXT NOT NULL,
    "adminPassword" TEXT NOT NULL,
    "adminIsActivated" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("adminId")
);

-- CreateTable
CREATE TABLE "Company" (
    "companyId" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "companyEmployeeNumber" INTEGER NOT NULL,
    "companyLocation" TEXT NOT NULL,
    "companyPhoneNumber" TEXT NOT NULL,
    "companyEmail" TEXT NOT NULL,
    "adminCompanyId" TEXT NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("companyId")
);

-- CreateTable
CREATE TABLE "Manager" (
    "managerId" TEXT NOT NULL,
    "managerFirstName" TEXT NOT NULL,
    "managerLastName" TEXT NOT NULL,
    "managerEmail" TEXT NOT NULL,
    "managerPassword" TEXT NOT NULL,
    "managerIsActivated" BOOLEAN NOT NULL DEFAULT true,
    "managerCompanyId" TEXT NOT NULL,

    CONSTRAINT "Manager_pkey" PRIMARY KEY ("managerId")
);

-- CreateTable
CREATE TABLE "EmailVerificationToken" (
    "emailVerificationTokenId" TEXT NOT NULL,
    "emailVerificationTokenToken" TEXT NOT NULL,
    "emailVerificationTokenAdminId" TEXT,
    "emailVerificationTokenManagerId" TEXT,
    "emailVerificationTokenCreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "emailVerificationTokenExpiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmailVerificationToken_pkey" PRIMARY KEY ("emailVerificationTokenId")
);

-- CreateTable
CREATE TABLE "Plan" (
    "planId" TEXT NOT NULL,
    "planName" TEXT NOT NULL,
    "planMaxAPICalls" INTEGER NOT NULL,
    "planMaxManagers" INTEGER NOT NULL,
    "planMaxDepartments" INTEGER NOT NULL,
    "planAllowedAITypes" TEXT NOT NULL,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("planId")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "subscriptionId" TEXT NOT NULL,
    "subscriptionStartDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subscriptionEndDate" TIMESTAMP(3) NOT NULL,
    "subscriptionCompanyId" TEXT NOT NULL,
    "subscriptionPlanId" TEXT NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("subscriptionId")
);

-- CreateTable
CREATE TABLE "Department" (
    "departmentId" TEXT NOT NULL,
    "departmentName" TEXT NOT NULL,
    "departmentType" "DepartementType" NOT NULL,
    "departmentCompanyId" TEXT NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("departmentId")
);

-- CreateTable
CREATE TABLE "DepartmentManager" (
    "departmentId" TEXT NOT NULL,
    "managerId" TEXT NOT NULL,

    CONSTRAINT "DepartmentManager_pkey" PRIMARY KEY ("departmentId","managerId")
);

-- CreateTable
CREATE TABLE "Table" (
    "tableId" TEXT NOT NULL,
    "tableName" TEXT NOT NULL,
    "tableDepartmentId" TEXT NOT NULL,
    "tableCreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tableUpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Table_pkey" PRIMARY KEY ("tableId")
);

-- CreateTable
CREATE TABLE "Task" (
    "taskId" TEXT NOT NULL,
    "taskTitle" TEXT NOT NULL,
    "taskDescription" TEXT NOT NULL,
    "taskAdminId" TEXT NOT NULL,
    "taskManagerId" TEXT NOT NULL,
    "taskCreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "taskDueDate" TIMESTAMP(3) NOT NULL,
    "taskStatus" TEXT NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("taskId")
);

-- CreateTable
CREATE TABLE "ThirdPartyIntegration" (
    "thirdPartyIntegrationId" TEXT NOT NULL,
    "thirdPartyIntegrationDepartmentId" TEXT NOT NULL,
    "thirdPartyIntegrationConnectionDetails" TEXT NOT NULL,

    CONSTRAINT "ThirdPartyIntegration_pkey" PRIMARY KEY ("thirdPartyIntegrationId")
);

-- CreateTable
CREATE TABLE "DatabaseConnection" (
    "databaseConnectionId" TEXT NOT NULL,
    "databaseConnectionDepartmentId" TEXT NOT NULL,
    "databaseConnectionConnectionString" TEXT NOT NULL,

    CONSTRAINT "DatabaseConnection_pkey" PRIMARY KEY ("databaseConnectionId")
);

-- CreateTable
CREATE TABLE "JsonUpload" (
    "id" TEXT NOT NULL,
    "json" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "jsonDepartmentId" TEXT NOT NULL,

    CONSTRAINT "JsonUpload_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trend" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT,
    "score" INTEGER NOT NULL DEFAULT 0,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Trend_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Posts" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DepartmentStrategies" (
    "departmentStrategieId" TEXT NOT NULL,
    "strategieContent" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "startegieDepartmentId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DepartmentStrategies_pkey" PRIMARY KEY ("departmentStrategieId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_adminEmail_key" ON "Admin"("adminEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Company_adminCompanyId_key" ON "Company"("adminCompanyId");

-- CreateIndex
CREATE UNIQUE INDEX "Manager_managerEmail_key" ON "Manager"("managerEmail");

-- CreateIndex
CREATE UNIQUE INDEX "EmailVerificationToken_emailVerificationTokenToken_key" ON "EmailVerificationToken"("emailVerificationTokenToken");

-- CreateIndex
CREATE UNIQUE INDEX "EmailVerificationToken_emailVerificationTokenAdminId_key" ON "EmailVerificationToken"("emailVerificationTokenAdminId");

-- CreateIndex
CREATE UNIQUE INDEX "EmailVerificationToken_emailVerificationTokenManagerId_key" ON "EmailVerificationToken"("emailVerificationTokenManagerId");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_subscriptionCompanyId_key" ON "Subscription"("subscriptionCompanyId");

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_adminCompanyId_fkey" FOREIGN KEY ("adminCompanyId") REFERENCES "Admin"("adminId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Manager" ADD CONSTRAINT "Manager_managerCompanyId_fkey" FOREIGN KEY ("managerCompanyId") REFERENCES "Company"("companyId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailVerificationToken" ADD CONSTRAINT "EmailVerificationToken_emailVerificationTokenAdminId_fkey" FOREIGN KEY ("emailVerificationTokenAdminId") REFERENCES "Admin"("adminId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailVerificationToken" ADD CONSTRAINT "EmailVerificationToken_emailVerificationTokenManagerId_fkey" FOREIGN KEY ("emailVerificationTokenManagerId") REFERENCES "Manager"("managerId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_subscriptionCompanyId_fkey" FOREIGN KEY ("subscriptionCompanyId") REFERENCES "Company"("companyId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_subscriptionPlanId_fkey" FOREIGN KEY ("subscriptionPlanId") REFERENCES "Plan"("planId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Department" ADD CONSTRAINT "Department_departmentCompanyId_fkey" FOREIGN KEY ("departmentCompanyId") REFERENCES "Company"("companyId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DepartmentManager" ADD CONSTRAINT "DepartmentManager_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("departmentId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DepartmentManager" ADD CONSTRAINT "DepartmentManager_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Manager"("managerId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Table" ADD CONSTRAINT "Table_tableDepartmentId_fkey" FOREIGN KEY ("tableDepartmentId") REFERENCES "Department"("departmentId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_taskAdminId_fkey" FOREIGN KEY ("taskAdminId") REFERENCES "Admin"("adminId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_taskManagerId_fkey" FOREIGN KEY ("taskManagerId") REFERENCES "Manager"("managerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThirdPartyIntegration" ADD CONSTRAINT "ThirdPartyIntegration_thirdPartyIntegrationDepartmentId_fkey" FOREIGN KEY ("thirdPartyIntegrationDepartmentId") REFERENCES "Department"("departmentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DatabaseConnection" ADD CONSTRAINT "DatabaseConnection_databaseConnectionDepartmentId_fkey" FOREIGN KEY ("databaseConnectionDepartmentId") REFERENCES "Department"("departmentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JsonUpload" ADD CONSTRAINT "JsonUpload_jsonDepartmentId_fkey" FOREIGN KEY ("jsonDepartmentId") REFERENCES "Department"("departmentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DepartmentStrategies" ADD CONSTRAINT "DepartmentStrategies_startegieDepartmentId_fkey" FOREIGN KEY ("startegieDepartmentId") REFERENCES "Department"("departmentId") ON DELETE RESTRICT ON UPDATE CASCADE;
