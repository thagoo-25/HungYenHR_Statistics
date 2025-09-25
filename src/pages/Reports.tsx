import React, { useState } from 'react';
import { 
  Download, 
  Filter, 
  Calendar, 
  TrendingUp, 
  FileSpreadsheet,
  FileText,
  RefreshCw
} from 'lucide-react';
import DateRangePicker from '../components/Filters/DateRangePicker';
import FilterGroup from '../components/Filters/FilterGroup';
import ChartContainer from '../components/Dashboard/ChartContainer';
import LineChart from '../components/Charts/LineChart';
import BarChart from '../components/Charts/BarChart';

const Reports: React.FC = () => {
  const [filters, setFilters] = useState({
    dateFrom: '2024-01-01',
    dateTo: '2024-12-31',
    industry: '',
    region: '',
    reportType: 'monthly'
  });

  const [showFilters, setShowFilters] = useState(false);

  const industries = [
    { value: 'manufacturing', label: 'Công nghiệp chế tạo' },
    { value: 'services', label: 'Dịch vụ' },
    { value: 'agriculture', label: 'Nông nghiệp' },
    { value: 'construction', label: 'Xây dựng' },
    { value: 'commerce', label: 'Thương mại' },
    { value: 'technology', label: 'Công nghệ thông tin' }
  ];

  const regions = [
    { value: 'hung-yen-city', label: 'Thành phố Hưng Yên' },
    { value: 'van-lam', label: 'Huyện Văn Lâm' },
    { value: 'van-giang', label: 'Huyện Văn Giang' },
    { value: 'yen-my', label: 'Huyện Yên Mỹ' },
    { value: 'my-hao', label: 'Huyện Mỹ Hào' },
    { value: 'an-thi', label: 'Huyện Ân Thi' },
    { value: 'khoai-chau', label: 'Huyện Khoái Châu' },
    { value: 'kim-dong', label: 'Huyện Kim Động' },
    { value: 'tien-lu', label: 'Huyện Tiên Lữ' }
  ];

  const reportTypes = [
    { value: 'monthly', label: 'Báo cáo theo tháng' },
    { value: 'quarterly', label: 'Báo cáo theo quý' },
    { value: 'yearly', label: 'Báo cáo theo năm' },
    { value: 'forecast', label: 'Báo cáo dự báo' }
  ];

  // Mock data for demonstration
  const forecastData = [
    { month: 'T7', value: 1820, target: 1800 },
    { month: 'T8', value: 1950, target: 1850 },
    { month: 'T9', value: 2100, target: 1900 },
    { month: 'T10', value: 2250, target: 2000 },
    { month: 'T11', value: 2400, target: 2100 },
    { month: 'T12', value: 2500, target: 2200 },
  ];

  const demandByIndustry = [
    { label: 'Công nghiệp chế tạo', value: 3200 },
    { label: 'Dịch vụ khách hàng', value: 2800 },
    { label: 'Công nghệ thông tin', value: 2400 },
    { label: 'Xây dựng', value: 2100 },
    { label: 'Thương mại điện tử', value: 1900 },
    { label: 'Y tế - Chăm sóc', value: 1650 }
  ];

  const handleApplyFilters = () => {
    // Apply filters logic here
    console.log('Applying filters:', filters);
    setShowFilters(false);
  };

  const handleExport = (format: 'excel' | 'pdf') => {
    // Export logic here
    console.log(`Exporting as ${format}`);
  };

  const handleSync = () => {
    // Sync data logic here
    console.log('Syncing data with Sở reports');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="mb-4 lg:mb-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Báo cáo thống kê
          </h1>
          <p className="text-gray-600">
            Báo cáo tổng hợp và dự báo nhu cầu lao động toàn tỉnh
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter size={16} className="mr-2" />
            Bộ lọc
          </button>
          
          <button
            onClick={handleSync}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw size={16} className="mr-2" />
            Đồng bộ dữ liệu
          </button>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleExport('excel')}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <FileSpreadsheet size={16} className="mr-2" />
              Excel
            </button>
            <button
              onClick={() => handleExport('pdf')}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <FileText size={16} className="mr-2" />
              PDF
            </button>
          </div>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Bộ lọc báo cáo
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <DateRangePicker
              startDate={filters.dateFrom}
              endDate={filters.dateTo}
              onChange={(start, end) => setFilters({ ...filters, dateFrom: start, dateTo: end })}
            />
            
            <FilterGroup
              label="Loại báo cáo"
              options={reportTypes}
              value={filters.reportType}
              onChange={(value) => setFilters({ ...filters, reportType: value })}
            />
            
            <FilterGroup
              label="Ngành nghề"
              options={industries}
              value={filters.industry}
              onChange={(value) => setFilters({ ...filters, industry: value })}
              placeholder="Tất cả ngành nghề"
            />
            
            <FilterGroup
              label="Khu vực"
              options={regions}
              value={filters.region}
              onChange={(value) => setFilters({ ...filters, region: value })}
              placeholder="Tất cả khu vực"
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setShowFilters(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
            <button
              onClick={handleApplyFilters}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Áp dụng bộ lọc
            </button>
          </div>
        </div>
      )}

      {/* Report Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Tổng số báo cáo</p>
              <p className="text-2xl font-bold text-gray-900">48</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FileText className="text-green-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Báo cáo tháng này</p>
              <p className="text-2xl font-bold text-gray-900">4</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="text-blue-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Đã đồng bộ</p>
              <p className="text-2xl font-bold text-gray-900">42</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <RefreshCw className="text-orange-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Tỷ lệ chính xác</p>
              <p className="text-2xl font-bold text-gray-900">96.2%</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-purple-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Forecast Chart */}
        <ChartContainer
          title="Dự báo nhu cầu lao động 6 tháng tới"
          subtitle="Dự báo dựa trên xu hướng và kế hoạch phát triển kinh tế"
        >
          <LineChart data={forecastData} color="#0284c7" />
        </ChartContainer>

        {/* Industry Demand */}
        <ChartContainer
          title="Nhu cầu lao động theo ngành nghề"
          subtitle="Dự báo số lượng việc làm cần thiết trong 6 tháng tới"
        >
          <BarChart data={demandByIndustry} orientation="horizontal" />
        </ChartContainer>
      </div>

      {/* Detailed Reports Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Báo cáo chi tiết
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Danh sách các báo cáo đã tạo và trạng thái đồng bộ
          </p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tên báo cáo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kỳ báo cáo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngành nghề
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày tạo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                {
                  name: 'Báo cáo việc làm tháng 6/2024',
                  period: 'Tháng 6/2024',
                  industry: 'Tất cả ngành',
                  status: 'Đã đồng bộ',
                  date: '01/07/2024'
                },
                {
                  name: 'Dự báo nhu cầu lao động Q3/2024',
                  period: 'Quý 3/2024',
                  industry: 'Công nghiệp',
                  status: 'Chờ xử lý',
                  date: '28/06/2024'
                },
                {
                  name: 'Báo cáo kết nối việc làm tháng 5',
                  period: 'Tháng 5/2024',
                  industry: 'Dịch vụ',
                  status: 'Đã đồng bộ',
                  date: '02/06/2024'
                }
              ].map((report, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {report.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.period}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.industry}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      report.status === 'Đã đồng bộ' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-green-600 hover:text-green-900 mr-4">
                      Xem
                    </button>
                    <button className="text-blue-600 hover:text-blue-900">
                      Tải xuống
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;