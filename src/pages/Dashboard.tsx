import React from 'react';
import { Users, Briefcase, TrendingUp, Building } from 'lucide-react';
import StatsCard from '../components/Dashboard/StatsCard';
import ChartContainer from '../components/Dashboard/ChartContainer';
import LineChart from '../components/Charts/LineChart';
import BarChart from '../components/Charts/BarChart';

const Dashboard: React.FC = () => {
  const monthlyData = [
    { month: 'T1', value: 1250, target: 1200 },
    { month: 'T2', value: 1380, target: 1300 },
    { month: 'T3', value: 1520, target: 1400 },
    { month: 'T4', value: 1420, target: 1450 },
    { month: 'T5', value: 1680, target: 1500 },
    { month: 'T6', value: 1750, target: 1600 },
  ];

  const industryData = [
    { label: 'Công nghiệp', value: 2850 },
    { label: 'Dịch vụ', value: 2340 },
    { label: 'Nông nghiệp', value: 1890 },
    { label: 'Xây dựng', value: 1650 },
    { label: 'Thương mại', value: 1420 },
  ];

  const regionData = [
    { label: 'TP Hưng Yên', value: 3200, color: '#16a34a' },
    { label: 'Văn Lâm', value: 2100, color: '#0284c7' },
    { label: 'Văn Giang', value: 1850, color: '#ea580c' },
    { label: 'Yên Mỹ', value: 1560, color: '#7c3aed' },
    { label: 'Mỹ Hào', value: 1340, color: '#dc2626' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Tổng quan hệ thống
        </h1>
        <p className="text-gray-600">
          Dashboard tổng hợp thông tin nhân sự và lao động tỉnh Hưng Yên
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Tổng số việc làm"
          value="12,485"
          change={{ value: 8.2, type: 'increase' }}
          icon={Briefcase}
          color="green"
        />
        <StatsCard
          title="Ứng viên đăng ký"
          value="8,642"
          change={{ value: 12.5, type: 'increase' }}
          icon={Users}
          color="blue"
        />
        <StatsCard
          title="Kết nối thành công"
          value="3,257"
          change={{ value: 6.3, type: 'increase' }}
          icon={TrendingUp}
          color="orange"
        />
        <StatsCard
          title="Doanh nghiệp tham gia"
          value="1,845"
          change={{ value: 4.1, type: 'increase' }}
          icon={Building}
          color="purple"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Monthly Trend */}
        <ChartContainer
          title="Xu hướng việc làm theo tháng"
          subtitle="So sánh thực tế với mục tiêu đặt ra"
        >
          <LineChart data={monthlyData} color="#16a34a" />
        </ChartContainer>

        {/* Industry Distribution */}
        <ChartContainer
          title="Phân bố theo ngành nghề"
          subtitle="Số lượng việc làm theo từng lĩnh vực"
        >
          <BarChart data={industryData} orientation="horizontal" />
        </ChartContainer>

        {/* Regional Distribution */}
        <ChartContainer
          title="Phân bố theo khu vực"
          subtitle="Việc làm tập trung tại các huyện, thành phố"
        >
          <BarChart data={regionData} />
        </ChartContainer>

        {/* Success Rate */}
        <ChartContainer
          title="Tỷ lệ kết nối thành công"
          subtitle="Hiệu quả hoạt động kết nối việc làm"
        >
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-6xl font-bold text-green-600 mb-4">74.2%</div>
              <p className="text-gray-600 mb-2">Tỷ lệ kết nối thành công</p>
              <div className="flex justify-center space-x-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span>Thành công: 3,257</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
                  <span>Chưa kết nối: 1,130</span>
                </div>
              </div>
            </div>
          </div>
        </ChartContainer>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Thao tác nhanh
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left transition-colors">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Briefcase size={20} className="text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Tạo báo cáo mới</p>
                <p className="text-sm text-gray-500">Báo cáo tùy chỉnh</p>
              </div>
            </div>
          </button>
          
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left transition-colors">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Dự báo lao động</p>
                <p className="text-sm text-gray-500">Phân tích xu hướng</p>
              </div>
            </div>
          </button>
          
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left transition-colors">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Users size={20} className="text-orange-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Đồng bộ dữ liệu</p>
                <p className="text-sm text-gray-500">Cập nhật từ Sở</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;