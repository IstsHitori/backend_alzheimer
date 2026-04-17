import { ActivityModule } from './activity/activity.module';
import { AnalysisModule } from './analysis/analysis.module';
import { AuthModule } from './auth/auth.module';
import { CatalogModule } from './catalog/catalog.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CommonModule } from './common/common.module';
import { PatientModule } from './patient/patient.module';
import { ReportsModule } from './reports/reports.module';
import { SeedModule } from './seed/seed.module';
import { StatsModule } from './stats/stats.module';
import { UserModule } from './user/user.module';

describe('Modules smoke', () => {
  it('exports module classes', () => {
    expect(ActivityModule).toBeDefined();
    expect(AnalysisModule).toBeDefined();
    expect(AuthModule).toBeDefined();
    expect(CatalogModule).toBeDefined();
    expect(CloudinaryModule).toBeDefined();
    expect(CommonModule).toBeDefined();
    expect(PatientModule).toBeDefined();
    expect(ReportsModule).toBeDefined();
    expect(SeedModule).toBeDefined();
    expect(StatsModule).toBeDefined();
    expect(UserModule).toBeDefined();
  });
});
